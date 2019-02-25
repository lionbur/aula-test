const expIsAudioFile = /\.mp3$/
const expMetadata = /^(.*?)\s*-\s*(.*?)(?:\s*\(.*\)\s*)*.mp3$/i

export type BasicMetadata = {
  artistCreditsString: ?string,
  title: ?string,
}

export const isAudioFile = (filename: string): boolean => expIsAudioFile.test(filename)
export function extractMetadataFromFilename(filename: string): BasicMetadata {
  const [, artistCreditsString, title] = expMetadata.exec(filename) || []

  return { artistCreditsString, title }
}
