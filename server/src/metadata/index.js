import mb from 'musicbrainz'

import { extractMetadataFromFilename, type BasicMetadata } from './fromFilename'
export { isAudioFile } from './fromFilename'

const searchArtists = (query: string): Promise<Array<string>> => new Promise(
  (resolve, reject) => {
    mb.searchArtists(query, {}, (err, artists) => {
      if (err) {
        return void reject(err)
      }
      resolve(artists)
    })
  }
)

const searchRecordings = (title: string, artist: string): Promise<Array<string>> => new Promise(
  (resolve, reject) => {
    mb.searchRecordings(title, { artist }, (err, recordings) => {
      if (err) {
        return void reject(err)
      }
      resolve(recordings)
    })
  }
)

const loadMoreData = (loader: object, properties: Array<string>): Promise<void> => new Promise(
  (resolve: () => void) => {
    loader.load(properties, resolve)
  }
)

export async function extractMetadata(filename: string): any {
  const basicMetadata = extractMetadataFromFilename(filename)
  const matchingRecordings = await searchRecordings(basicMetadata.title, basicMetadata.artist)

  if (matchingRecordings && matchingRecordings.length) {
    const mostMatchingRecording = matchingRecordings[0]

    await loadMoreData(mostMatchingRecording, ['artists'])

    const metadata = {
      ...basicMetadata,
      artist: mostMatchingRecording.artist,
    }

    if (mostMatchingRecording.artistCredits) {
      metadata.artistCredits = mostMatchingRecording
        .artistCredits
        .map(({ artist: { name } }) => name)
    }
    return metadata
  }

  return basicMetadata
}
