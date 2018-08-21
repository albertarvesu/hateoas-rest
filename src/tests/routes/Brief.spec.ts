// tslint:disable-next-line:no-object-mutation
process.env.NODE_ENV = 'testing'

import * as chai from 'chai'
import * as faker from 'faker'
import * as jsonwebtoken from 'jsonwebtoken'

import { server } from '../../index'

import chaiHttp = require('chai-http')
import Brief, { IBrief } from '../../models/Brief'

const expect = chai.expect
chai.use(chaiHttp)

const params: IBrief = {
  budget: { remaining: faker.random.number(5000), spent: faker.random.number(5000) },
  call_to_action: faker.random.words(4),
  donts: [faker.random.words(4)],
  dos: [faker.random.words(6)],
  follower_threshold: faker.random.number(5000),
  hero_16x9: {
    large_thumbnail_url: faker.image.imageUrl(300, 300),
    original_url: faker.image.imageUrl(300, 300),
    thumbnail_url: faker.image.imageUrl(300, 300),
  },
  hero_image: {
    large_thumbnail_url: faker.image.imageUrl(300, 300),
    original_url: faker.image.imageUrl(300, 300),
    thumbnail_url: faker.image.imageUrl(300, 300),
  },
  objective: faker.random.words(10),
  product: {
    link: faker.internet.url(),
    name: faker.commerce.productName(),
    text: faker.random.words(5),
    where_to_find: faker.random.words(5),
  },
  publishing_rules: [faker.random.words(3)],
  status: 'Completed',
  supported_submission_types: ['social_submission'],
}

describe('Brief Routes', () => {

  beforeEach((done) => {
    Brief.remove({}, (err) => {
      done()
    })
  })

  it('should respond with 403 status code if no authorization header', (done) => {
    chai.request(server)
      .get('/briefs')
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(403)
        done()
      })
  })

  it('should respond with 200 with valid auth token', (done) => {
    const token = jsonwebtoken.sign(
                    { id: 1 },
                    process.env.APP_SECRET || 'secret',
                    { expiresIn: 60 * 60 },
                  )
    chai.request(server)
      .get('/briefs')
      .set('Authorization', `Bearer ${token}`)
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(200)
        done()
      })
  })

  it('should return list of briefs', (done) => {
    const token = jsonwebtoken.sign(
                    { id: 1 },
                    process.env.APP_SECRET || 'secret',
                    { expiresIn: 60 * 60 },
                  )
    new Brief(params).save()
    chai.request(server)
      .get('/briefs')
      .set('Authorization', `Bearer ${token}`)
      .end((err: Error, res: any): void => {
        expect(res.body.data.length).to.be.equal(1)
        expect(res.body.links.length).to.be.equal(1)
        expect(res.body.meta.total).to.be.equal(1)
        expect(res.statusCode).to.be.equal(200)
        done()
      })
  })

})
