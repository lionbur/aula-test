import { extractMetadataFromMusicBrainz, type MusicBrainzMetadata } from './fromMusicBrainz'
import { extractMetadataFromFilename, type BasicMetadata } from './fromFilename'
export { isAudioFile } from './fromFilename'

export async function extractMetadata(filename: string): any {
  const basicMetadata: BasicMetadata = extractMetadataFromFilename(filename)
  const musicBrainzMetadata: ?MusicBrainzMetadata = await extractMetadataFromMusicBrainz(basicMetadata)

  return {
    filename,
    ...(musicBrainzMetadata || basicMetadata)
  }
}
