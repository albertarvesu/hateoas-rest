// tslint:disable-next-line:no-object-mutation
process.env.NODE_ENV = 'testing'

import * as chai from 'chai'
import * as faker from 'faker'

import Brief, { IBrief } from './../../models/Brief'
import Submission, { ISubmission } from './../../models/Submission'

const expect = chai.expect

describe('Submission Model', () => {

  const briefParams: IBrief = {
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

  const submissionParams = {
    amount_cents: faker.random.number(5000),
    amount_currency: faker.finance.currencyCode(),
    brand: {
      logo: faker.image.imageUrl(300, 300),
      name: faker.random.words(2),
    },
    caption: faker.random.words(20),
    identity: {
      avatar: faker.image.imageUrl(300, 300),
      followers_count: faker.random.number(3000),
      provider: 'instagram',
      social_page_url: faker.internet.url(),
      username: faker.internet.userName(),
    },
    influencer: {
      name: faker.name.findName(),
      rating: faker.random.number(5),
    },
    media_objects: {
      content_type: 'image/png',
      height: 500,
      original_url: faker.image.imageUrl(500, 500),
      url: faker.image.imageUrl(300, 300),
      width: 500,
    },
    status: 'pending',
  }

  beforeEach((done) => {
    Submission.remove({}, (err) => {
      done()
    })
  })

  it('should query all submission for specific brief', async () => {

    const brief = await new Brief(briefParams).save()

    await new Submission({ ...submissionParams, brief: brief.toJSON()._id }).save()
    await new Submission({ ...submissionParams, brief: brief.toJSON()._id }).save()

    const list = await Submission.find({ brief: brief.toJSON()._id })

    expect(list.length).to.be.equal(2)

  })

  it('should insert new submission', async () => {

    const brief = await new Brief(briefParams).save()

    const result = await new Submission({ ...submissionParams, brief: brief.toJSON()._id }).save()
    const submission: ISubmission = result.toJSON()

    expect(submission).to.be.an('object')
    expect(submission.amount_cents).to.be.equal(submissionParams.amount_cents)
    expect(submission.influencer.name).to.be.equal(submissionParams.influencer.name)

  })

  it('should patch an existing submission',  async () => {

    const brief = await new Brief(briefParams).save()

    const result = await new Submission({ ...submissionParams, brief: brief.toJSON()._id }).save()
    const submission: ISubmission = result.toJSON()

    const updated = await Submission.findByIdAndUpdate(
                      submission._id,
                      { amount_cents: 10000 },
                      { new: true },
                    )
    const newSubmission: ISubmission = updated && updated.toJSON()

    expect(newSubmission).to.be.an('object')
    expect(newSubmission.amount_cents).to.be.equal(10000)

  })

})
