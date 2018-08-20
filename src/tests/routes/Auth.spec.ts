// tslint:disable-next-line:no-object-mutation
process.env.NODE_ENV = 'testing'

import * as chai from 'chai'
import * as faker from 'faker'

import { server } from '../../index'

import chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const email = faker.internet.email().toLowerCase()

const signInDetails = {
  email,
  password: 'password',
}

const signUpDetails = {
  email,
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'password',
}

describe('Auth Routes', () => {

  it('should sign up user successfully', (done) => {
    chai.request(server)
      .post('/auth/signUp')
      .set('content-type', 'application/json')
      .send(signUpDetails)
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.data.accessToken).to.not.equal(null)
        expect(res.body.data.email).to.be.equal(email)
        expect(res.body.data.lastName).to.be.equal('lastName')
        expect(res.body.data.firstName).to.be.equal('firstName')
        expect(res.body.links.length).to.be.equal(4)
        done()
      })
  })

  it('should fail sign in on invalid credentials', (done) => {
    chai.request(server)
      .post('/auth/signIn')
      .set('content-type', 'application/json')
      .send({ email: 'test@example.com', password: '12345' })
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(400)
        done()
      })
  })

  it('should signIn the user sucessfully', (done) => {
    chai.request(server)
      .post('/auth/signIn')
      .set('content-type', 'application/json')
      .send(signInDetails)
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.data.lastName).to.be.equal('lastName')
        expect(res.body.data.firstName).to.be.equal('firstName')
        expect(res.body.links.length).to.be.equal(4)
        done()
      })
  })
})
