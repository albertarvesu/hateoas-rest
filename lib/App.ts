import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as mongoose from 'mongoose'

import { Routes } from './Routes'

class App {

  public app: express.Application
  public router: Routes = new Routes()
  public mongoUrl: string = 'mongodb://localhost:27017/hateoasrest'

  constructor() {
    this.app = express()
    this.config()
    this.router.routes(this.app)
    this.mongoSetup()
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
  }

}

export default new App().app
