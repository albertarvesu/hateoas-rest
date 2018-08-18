// tslint:disable-next-line:no-object-mutation
process.env.NODE_ENV = 'testing'

import * as chai from 'chai'

import { server } from '../../index'

import chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

describe('Root Routes', () => {
  it('should return two root links', (done) => {
    chai.request(server)
      .get('/')
      .end((err: Error, res: any): void => {
        expect(res.body.length).to.be.equal(2)
        expect(res.statusCode).to.be.equal(200)
        done()
      })
  })
  it('should return first link as signIn', (done) => {
    chai.request(server)
      .get('/')
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body[0].href).to.include('signIn')
        expect(res.body[0].method).to.be.equal('POST')
        expect(res.body[0].rel).to.be.equal('signIn')
        done()
      })
  })
})
