
import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

interface IHeroImage {
  original_url: string
  thumbnail_url: string
  large_thumbnail_url: string
}

interface IBudget {
  spent: number
  remaining: number
}

interface IProduct {
  name: string
  link: string
  text: string
  where_to_find: string
}

export interface IBrief {
  follower_threshold: number
  supported_submission_types: ReadonlyArray<string>
  status: string
  publishing_rules: ReadonlyArray<string>
  objective: string
  call_to_action: string
  dos: ReadonlyArray<string>
  donts: ReadonlyArray<string>
  hero_image: IHeroImage
  hero_16x9: IHeroImage
  budget: IBudget
  product: IProduct
}

// tslint:disable-next-line:variable-name
const BriefSchema = new Schema({
  budget: Schema.Types.Mixed,
  call_to_action: String,
  createdAt: {
    default: Date.now,
    type: Date,
  },
  donts: [String],
  dos: [String],
  follower_threshold: Number,
  hero_16x9: Schema.Types.Mixed,
  hero_image: Schema.Types.Mixed,
  objective: String,
  product: Schema.Types.Mixed,
  publishing_rules: [String],
  status: String,
  supported_submission_types: [String],
  updatedAt: {
    default: Date.now,
    type: Date,
  },
})

// tslint:disable-next-line:variable-name
const Brief = mongoose.model('Brief', BriefSchema)

export default Brief
