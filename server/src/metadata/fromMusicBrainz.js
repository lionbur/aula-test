// $FlowFixMe
import mb from 'musicbrainz'
import { pick } from 'lodash/fp'

import { type BasicMetadata } from './fromFilename'

type LifeSpan = {
  begin: string,
  end: ?string,
}

type Artist = {
  name: string,
  aliases: Array<string>,
  type: string,
  country: string,
  lifeSpan: LifeSpan,
}

type ArtistCredit = {
  artist: Artist,
}

type MusicBrainzRecording = {
  title: string,
  artistCredits: Array<ArtistCredit>,
  artistCreditsString: () => string,
}

const searchRecording = (title: string, artist: ?string): Promise<MusicBrainzRecording> => new Promise(
  (resolve, reject) => {
    mb.searchRecordings(title, { artist, limit: 1 }, (err, recordings) => {
      if (err) {
        return void reject(err)
      }
      resolve(recordings[0])
    })
  }
)

const searchArtist = (query: string): Promise<Artist> => new Promise(
  (resolve, reject) => {
    mb.searchArtists(query, { limit: 1 }, (err, artists) => {
      if (err) {
        return void reject(err)
      }
      resolve(artists[0])
    })
  }
)

const loadMoreData = (loader: any, properties: Array<string>): Promise<void> => new Promise(
  (resolve: () => void) => {
    loader.load(properties, resolve)
  }
)

export type MusicBrainzMetadata = {
  title: string,
  artistCreditsString: string,
  artists: Array<any>,
}

export async function extractMetadataFromMusicBrainz(basicMetadata: BasicMetadata): Promise<?MusicBrainzMetadata> {
  if (!basicMetadata.title) {
    return null
  }

  const recording: MusicBrainzRecording = await searchRecording(basicMetadata.title, basicMetadata.artistCreditsString)

  if (recording) {
    await loadMoreData(recording, ['artists'])

    const artistNames = recording
      .artistCredits
      .map(({ artist: { name } }) => name)

    const artists = await Promise.all(
      artistNames
        .map(searchArtist)
    )

    const pickArtist = pick(['name', 'aliases', 'lifeSpan', 'country', 'type'])
    return {
      artistCreditsString: recording.artistCreditsString(),
      artists: artists
        .map(pickArtist),
      title: recording.title,
    }
  }

  return null
}
