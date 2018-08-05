import * as express from 'express'

import Auth, { verify } from './Auth'
import Brief from './Brief'
import Root from './Root'

export class Routes {
  // tslint:disable-next-line:variable-name
  public routes(App: express.Application): void {
    App.route('/').get(Root)
    App.use('/auth', Auth)

    App.use(verify)
    App.use('/briefs', Brief)
  }
}
