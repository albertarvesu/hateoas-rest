import * as express from 'express'

import Auth, { verify } from './Auth'
import Brief from './Brief'
import Me from './Me'
import Root from './Root'

export class Routes {
  // tslint:disable-next-line:variable-name
  public routes(App: express.Application): void {
    App.route('/').get(Root)
    App.use('/auth', Auth)

    App.use(verify)

    App.use('/me', Me)
    App.use('/briefs', Brief)
  }
}
