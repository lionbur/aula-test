/* eslint-disable no-console */

// $FlowFixMe
import 'dotenv/config'
import getFileList, { type S3Object } from './fileList'

async function main() {
  const mp3Files: Array<S3Object> = await getFileList()
  console.log(mp3Files
    .map(({ Key}) => Key))
}

void main()
