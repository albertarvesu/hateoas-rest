import * as faker from 'faker'
import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/hateoasrest', { useNewUrlParser: true })

import Brief, { IBrief } from './../lib/models/Brief'

Brief.remove({}).exec()

// tslint:disable-next-line
for (let i = 0; i < 10; i++) {
  const brief: IBrief = {
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
  }
  new Brief(brief).save()
}
