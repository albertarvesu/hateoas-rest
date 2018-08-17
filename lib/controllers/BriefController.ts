import Brief, { IBrief } from './../models/Brief'

export class BriefController {

  public async list(query) {
    try {
      const limit = parseInt(query.limit, 10) || 20
      const offset = parseInt(query.offset, 10) || 0

      const briefs = await Brief.find({})
                        .limit(limit)
                        .skip(offset)
                        .exec()
      return {
        data: briefs.map((item) => {
          const brief = item.toJSON()
          return {
            ...brief,
            links: [
              ...this.generateSelf(brief),
              ...this.generateLinks(brief),
            ],
          }
        }),
        links: [
          ...this.generateSelf(),
        ],
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  public async show(params) {
    try {
      const result = await Brief.findById(params.briefId).exec()
      const brief = result && result.toJSON()
      return {
        data: brief,
        links: [
          ...this.generateSelf(brief),
          ...this.generateLinks(brief),
        ],
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  public async create(body: IBrief) {
    try {
      const result = await new Brief(body).save()
      const brief = result && result.toJSON()
      return {
        data: brief,
        links: [
          ...this.generateSelf(brief),
          ...this.generateLinks(brief),
        ],
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  public async patch(params: any, body: any) {
    try {
      const result = await Brief.findByIdAndUpdate(params.briefId, body, { new: true })
      const brief = result && result.toJSON()
      return {
        data: brief,
        links: [
          ...this.generateSelf(brief),
          ...this.generateLinks(brief),
        ],
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  public async remove(params: any) {
    try {
      const result = await Brief.findByIdAndRemove(params.briefId)
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  /** Private methods */

  private generateSelf(brief?: IBrief) {
    return [
      {
        href: `${process.env.HOSTNAME}/briefs${ brief ? `/${brief._id}` : '{?offset,limit}' }`,
        method: 'GET',
        rel: 'self',
      },
    ]
  }

  private generateLinks(brief) {
    return [
      {
        href: `${process.env.HOSTNAME}/briefs/${brief._id}/submission{?offset,limit}`,
        method: 'GET',
        rel: 'listSubmissions',
      },
    ]
  }
}

export default BriefController
