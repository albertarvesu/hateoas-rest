import * as faker from 'faker'
import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/hateoasrest', { useNewUrlParser: true })

import Brief, { IBrief } from './../lib/models/Brief'
import Submission, { ISubmission } from './../lib/models/Submission'

const createBrief = () => ({
  _id: mongoose.Types.ObjectId(),
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
} as IBrief)

const createSubmission = () => ({
  _id: mongoose.Types.ObjectId(),
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
} as ISubmission)

Brief.remove({}).exec()
Submission.remove({}).exec()

const start = async() => {

  // tslint:disable-next-line
  for (let i = 0; i < 10; i++) {

    const brief = await new Brief(createBrief()).save()

    const count = Math.floor(Math.random() * 20) + 5

    // tslint:disable-next-line
    for (let x = 0; x < count; x++) {
      const submission: ISubmission = {
        ...createSubmission(),
        brief: brief.toJSON()._id,
      }
      new Submission(submission).save()
    }
  }
}

start()
