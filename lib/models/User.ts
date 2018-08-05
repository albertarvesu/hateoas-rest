import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface IUser {
  email: string
  firstName: string
  lastName: string
  password: string
}

// tslint:disable-next-line:variable-name
const UserSchema = new Schema({
  createdAt: {
    default: Date.now,
    type: Date,
  },
  email: {
    email: true,
    lowercase: true,
    required: true,
    type: String,
    unique: true,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
  },
})

// tslint:disable-next-line:variable-name
const User = mongoose.model('User', UserSchema)

export default User
