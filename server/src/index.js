/* eslint-disable no-console */
/* global process */

// $FlowFixMe
import 'dotenv/config'
// $FlowFixMe
import Koa from 'koa'

import createIndexRouter from './routes'

async function main() {
  const { S3_BUCKET, PORT = 3000 } = process.env

  if (!S3_BUCKET) {
    console.error('Configuration is missing')
    return void process.exit(1)
  }

  console.log('Initializing ...')

  const app = new Koa()
  const router = await createIndexRouter(S3_BUCKET)

  app.use(router.routes())
  app.listen(PORT)

  console.log(`Server is listening on port ${PORT || 0}`)
}

void main()
