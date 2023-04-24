import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
import BaseRouter from './routes/baseRouter'
import { errorResponse } from './errors/handler'
import { config } from 'dotenv'
import { join } from 'path'

class App {
  public express: express.Application
  public constructor () {
    config()

    this.express = express()
    this.middlewares()
    this.viewsSettings()
    this.routes()
    this.errorMiddlewares()
  }

  private viewsSettings () {
    this.express.set('view engine', 'pug')
    this.express.set('views', join(__dirname, 'views'))
  }

  private middlewares () {
    this.express.use(express.json())
    this.express.use(express.static(join(__dirname, 'views')))
    this.express.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }

  private errorMiddlewares () {
    // this.express.use(errorLogging)
    this.express.use(errorResponse)
  }

  private routes () {
    this.express.use('/', BaseRouter)
  }
}

export default new App().express
