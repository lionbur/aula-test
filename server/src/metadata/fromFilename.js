const expIsAudioFile = /\.mp3$/
const expMetadata = /^(.*?)\s*-\s*(.*?)\s*\(.*\).mp3$/i

export type BasicMetadata = {
  filename: string,
  artist: ?string,
  title: ?string,
}

export const isAudioFile = (filename: string): boolean => expIsAudioFile.test(filename)
export function extractMetadataFromFilename(filename: string): BasicMetadata {
  const [_, artist, title] = expMetadata.exec(filename) || []

  return { filename, artist, title }
}
