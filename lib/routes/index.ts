import * as express from 'express'

import Auth from './Auth'
import Brief from './Brief'
import Root from './Root'

export class Routes {
  public routes(App: express.Application): void {
    App.route('/').get(Root)
    App.use('/auth', Auth)
    App.use('/briefs', Brief)
  }
}
