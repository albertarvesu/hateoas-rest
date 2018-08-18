import { config } from 'dotenv'

config()

// tslint:disable-next-line:no-object-mutation
process.env.NODE_ENV = 'testing'
