import { IUser } from './../models/User'

export class MeController {

  public async show(currentUser: IUser) {
    try {
      return {
        data: currentUser,
        links: [
          ...this.generateSelf(),
          ...this.generateLinks(),
        ],
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  private generateSelf() {
    return [
      {
        href: `${process.env.HOSTNAME}/me`,
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

export default MeController
