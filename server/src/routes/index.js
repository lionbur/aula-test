import Router from 'koa-router'

import createApiRouter from './api'

export default async function createIndexRouter(bucket: string) {
  const indexRouter = new Router()
  const apiRouter = await createApiRouter(bucket)

  indexRouter
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods())

  return indexRouter
}

