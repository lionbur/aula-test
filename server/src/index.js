/* eslint-disable no-console */

import 'dotenv/config'

function main() {
  const { S3_BUCKET } = process.env

  console.log(`BUCKET is ${S3_BUCKET}`)
}

main()
