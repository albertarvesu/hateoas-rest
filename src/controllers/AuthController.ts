import * as bcrypt from 'bcrypt'
import * as jsonwebtoken from 'jsonwebtoken'
import User, { IUser } from './../models/User'

export interface ISignIn {
  email: string
  password: string
}

export class AuthController {
  public async signIn (signInParams: ISignIn) {
    try {
      const userResp = await User.findOne({ email: signInParams.email })
      if (!userResp) {
        throw new Error('Email address not found')
      }
      const { password, ...userJson } = userResp.toJSON()
      const match = await bcrypt.compare(signInParams.password, password)

      if (!match) {
        throw new Error('Password did not match')
      }

      return {
        data: {
          accessToken: this.generateToken(userJson),
          ...userJson,
        },
        links: [
          ...this.generateSelf(),
          ...this.generateLinks(),
        ],
      }

    } catch (e) {
      throw new Error(e)
    }

  }

  public async signUp (userParams: IUser) {
    try {
      const passwordHash: string = await bcrypt.hash(userParams.password, 10)
      const user = new User({ ...userParams, password: passwordHash })

      const userResp = await user.save()
      const { password, ...userJson } = userResp.toJSON()

      return {
        data: {
          accessToken: this.generateToken(userJson),
          ...userJson,
        },
        links: [
          ...this.generateSelf(),
          ...this.generateLinks(),
        ],
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  public async verify(token: string) {
    try {
      return await jsonwebtoken.verify(token, process.env.APP_SECRET || 'secret')
    } catch (e) {
      throw new Error('Invalid token')
    }
  }

  private generateToken(userJson: IUser) {
    return jsonwebtoken.sign(userJson, process.env.APP_SECRET || 'secret', { expiresIn: '1 day' })
  }

  private generateSelf() {
    return [
      {
        href: `${process.env.HOSTNAME}/api/me`,
        method: 'GET',
        rel: 'self',
      },
    ]
  }

  private generateLinks() {
    return [
      {
        href: `${process.env.HOSTNAME}/briefs{?offset,limit}`,
        method: 'GET',
        rel: 'listBriefs',
      },
      {
        href: `${process.env.HOSTNAME}/briefs`,
        method: 'POST',
        rel: 'createBrief',
      },
      {
        href: `${process.env.HOSTNAME}/auth/signOut`,
        method: 'GET',
        rel: 'signOut',
      },
    ]
  }

}

export default AuthController
