import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

interface IBrand {
  name: string
  logo: string
}

interface IInfluencer {
  name: string
  rating: number
}

interface IIdentity {
  provider: string
  username: string
  followers_count: number
  avatar: string
  social_page_url: string
}

interface IMediaObject {
  content_type: string
  url: string
  original_url: string
  width: number
  height: number
}

export interface ISubmission {
  _id: mongoose.Types.ObjectId,
  brief: mongoose.Types.ObjectId,
  amount_cents: number
  amount_currency: string
  caption: string
  brand: IBrand
  influencer: IInfluencer
  identity: IIdentity
  media_objects?: IMediaObject
  status: string
}

// tslint:disable-next-line:variable-name
const SubmissionSchema = new Schema({
  amount_cents: Number,
  amount_currency: String,
  brand: Schema.Types.Mixed,
  brief: { type: Schema.Types.ObjectId, ref: 'Brief' },
  caption: String,
  createdAt: {
    default: Date.now,
    type: Date,
  },
  identity: Schema.Types.Mixed,
  influencer: Schema.Types.Mixed,
  media_objects: Schema.Types.Mixed,
  status: String,
  updatedAt: {
    default: Date.now,
    type: Date,
  },
})

// tslint:disable-next-line:variable-name
const Submission = mongoose.model('Submission', SubmissionSchema)

export default Submission
