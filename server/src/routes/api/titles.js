import Router from 'koa-router'

import type {S3Object} from '../../fileList'
import getFileList from '../../fileList'
import {extractMetadata, isAudioFile} from '../../metadata'

export default async function createTitlesRouter(bucket: string) {
  const router = new Router()

  const objects: Array<S3Object> = await getFileList(bucket)
  const metadatas = await Promise.all(
    objects
      .map(({Key}) => Key)
      .filter(isAudioFile)
      .map(extractMetadata)
  )

  router
    .get('/', ctx => {
      ctx.body = metadatas
          .map(({ title, artistCreditsString }, id) => ({
            id,
            title,
            artistCreditsString,
          }))
    })
    .get('/:id', ctx => {
      const found = metadatas[ctx.params.id]

      if (!found) {
        ctx.status = 400
        ctx.body = {
          param: 'id',
          value: ctx.params.id,
          message: 'not found',
        }
      } else {
        ctx.body = found
      }
    })

  return router
}

