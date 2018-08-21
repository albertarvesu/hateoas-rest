// tslint:disable-next-line:no-object-mutation
process.env.NODE_ENV = 'testing'

import * as chai from 'chai'

import { server } from '../../'

import chaiHttp = require('chai-http')
import Brief from '../../models/Brief'
import Submission from '../../models/Submission'

const expect = chai.expect
chai.use(chaiHttp)

describe('Submission Routes', () => {

  beforeEach((done) => {
    Brief.remove({}, (err) => {
      Submission.remove({}, () => {
        done()
      })
    })
  })

  it('should respond with 403 status code if no authorization header', (done) => {
    chai.request(server)
      .get(`/briefs/briefs/5b769df911dcf1081e1b532f/submissions`)
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(403)
        done()
      })
  })

})
