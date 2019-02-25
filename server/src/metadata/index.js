const expIsAudioFile = /\.mp3$/
const expMetaData = /^(.*?)\s*-\s*(.*?)\s*\(.*\).mp3$/i

export type BasicMetadata = {
  filename: string,
  author: ?string,
  title: ?string,
}

export const isAudioFile = (filename: string): boolean => expIsAudioFile.test(filename)
function extractMetadataFromFilename(filename): BasicMetadata {
  const [_, author, title] = expMetaData.exec(filename) || []

  return { filename, author, title }
}

export async function extractMetadata(filename: string): any {
  return extractMetadataFromFilename(filename)
}
