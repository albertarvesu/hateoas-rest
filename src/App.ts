import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import { Mockgoose } from 'mockgoose'
import * as mongoose from 'mongoose'

import { Routes } from './routes'

class App {
  public app: express.Application
  public router: Routes = new Routes()
  public mongoUrl: string = process.env.MONGO_URL ||
    `mongodb://localhost:27017/${process.env.MONGO_DB || 'hateoasrest'}`

  constructor() {
    this.app = express()
    this.config()
    this.router.routes(this.app)
    this.mongoSetup()
  }

  private config(): void {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private async mongoSetup() {
    if (process.env.NODE_ENV === 'testing') {
      const mockgoose: Mockgoose = new Mockgoose(mongoose)
      await mockgoose.prepareStorage()
    }

    mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
    mongoose.connection.on('connected', () => {
      // tslint:disable-next-line:no-console
      console.log(`Database connected: ${process.env.NODE_ENV || ''}`)
    })
  }

}

export default new App().app
