/* eslint-disable no-console */
/* global process */

// $FlowFixMe
import 'dotenv/config'
import getFileList, { type S3Object } from './fileList'
import { isAudioFile, extractMetadata } from './metadata'

async function main() {
  const { S3_BUCKET } = process.env

  if (!S3_BUCKET) {
    console.error('Configuration is missing')
    return void process.exit(1)
  }

  const objects: Array<S3Object> = await getFileList(S3_BUCKET)
  const metadatas = await Promise.all(
    objects
      .map(({ Key }) => Key)
      .filter(isAudioFile)
      .map(extractMetadata)
  )

  console.log(metadatas
    .map(metadata => ({
      ...metadata,
      url: `https://s3-eu-west-1.amazonaws.com/${S3_BUCKET}/${encodeURIComponent(metadata.filename)}`,
    }))
  )
}

void main()
