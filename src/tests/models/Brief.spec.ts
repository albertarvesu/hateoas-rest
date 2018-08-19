// tslint:disable-next-line:no-object-mutation
process.env.NODE_ENV = 'testing'

import * as chai from 'chai'
import * as faker from 'faker'

import Brief, { IBrief } from './../../models/Brief'

const expect = chai.expect

describe('Brief Model', () => {

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

  beforeEach((done) => {
    Brief.remove({}, (err) => {
      done()
    })
  })

  it('should query all briefs', async () => {

    await new Brief(params).save()
    await new Brief(params).save()
    await new Brief(params).save()

    const list = await Brief.find({})

    expect(list.length).to.be.equal(3)

  })

  it('should insert new brief', async () => {

    const result = await new Brief(params).save()
    const brief: IBrief = result.toJSON()

    expect(brief).to.be.an('object')
    expect(brief.budget.remaining).to.be.equal(params.budget.remaining)
    expect(brief.product.link).to.be.equal(params.product.link)

  })

  it('should patch an existing brief',  async () => {

    const result = await new Brief(params).save()
    const brief = result && result.toJSON()

    const updated = await Brief.findByIdAndUpdate(
                    brief._id,
                    { call_to_action: 'Call to Action' },
                    { new: true },
                  )
    const newBrief: IBrief = updated && updated.toJSON()

    expect(newBrief).to.be.an('object')
    expect(newBrief.call_to_action).to.be.equal('Call to Action')

  })

})
