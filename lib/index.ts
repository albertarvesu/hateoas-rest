import * as dotenv from 'dotenv'
import * as http from 'http'

import App from './App'

dotenv.config()

const PORT = process.env.PORT

const server: http.Server = App.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log('Express server listening on port ' + PORT)
})

export { server }
