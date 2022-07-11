import testRouter from './Test.routers.js'
import sectionRouter from './Section.routers.js'
export const router = (app) => {
  app.use('/api/tests/', testRouter)
  app.use('/api/sections/', sectionRouter)
}
