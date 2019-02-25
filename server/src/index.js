/* eslint-disable no-console */

// $FlowFixMe
import 'dotenv/config'
import getFileList, { type S3Object } from './fileList'
import { isAudioFile, extractMetadata } from './metadata'

async function main() {
  const objects: Array<S3Object> = await getFileList()
  const metadatas = await Promise.all(
    objects
      .map(({ Key }) => Key)
      .filter(isAudioFile)
      .map(extractMetadata)
  )

  console.log(metadatas)
}

void main()
