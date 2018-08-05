import * as bcrypt from 'bcrypt'
// import * as jsonwebtoken from 'jsonwebtoken'
import User, { IUser } from './../models/User'

const signUp = async (userParams: IUser) => {
  try {
    const passwordHash: string = await bcrypt.hash(userParams.password, 10)
    const user = new User({ ...userParams, passwordHash })

    const userResp = await user.save()

    const { password, ...userJson } = userResp.toJSON()

    // const token = jsonwebtoken.sign(
    //   userJson,
    //   '$pid5aL',
    //   {
    //     expiresIn: '1 day',
    //   },
    // )

    const response = {
      ...userJson,
      self: [
        {
          href: 'http://127.0.0.1/api/me',
          method: 'GET',
          rel: 'me',
        },
      ],
    }

    return response
  } catch (e) {
    throw new Error(e)
  }
}

export default {
  signUp,
}
