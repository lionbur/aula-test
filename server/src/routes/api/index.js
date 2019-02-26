import Router from 'koa-router'

import createTitlesRouter from './titles'

export default async function createApiRouter(bucket: string) {
  const apiRouter = new Router()
  const titlesRouter = await createTitlesRouter(bucket)

  apiRouter
    .use('/titles', titlesRouter.routes(), titlesRouter.allowedMethods())

  return apiRouter
}

