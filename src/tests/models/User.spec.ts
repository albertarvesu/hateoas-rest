// tslint:disable-next-line:no-object-mutation
process.env.NODE_ENV = 'testing'

import * as chai from 'chai'
import * as faker from 'faker'

import User, { IUser } from './../../models/User'

const expect = chai.expect

describe('User Model', () => {

  const params: IUser = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  }

  it('should insert new user', async () => {

    const result = await new User(params).save()
    const user: IUser = result.toJSON()

    expect(user).to.be.an('object')
    expect(user.firstName).to.be.equal(params.firstName)
    expect(user.password).to.be.equal(params.password)

  })

})
