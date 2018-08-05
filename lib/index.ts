import * as dotenv from 'dotenv'

import App from './App'

dotenv.config()

const PORT = process.env.PORT

App.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log('Express server listening on port ' + PORT)
})
