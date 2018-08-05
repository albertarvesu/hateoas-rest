import * as express from 'express'

import Auth from './Auth'
import Root from './Root'

export class Routes {
  public routes(App: express.Application): void {
    App.route('/api').get(Root)

    App.use('/api/auth', Auth)
  }
}
