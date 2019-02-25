/* eslint-disable no-console */

// $FlowFixMe
import 'dotenv/config'

function main() {
  const { S3_BUCKET } = process.env

  // $FlowFixMe
  console.log(`BUCKET is ${S3_BUCKET}`)
}

main()
