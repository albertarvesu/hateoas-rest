import Brief, { IBrief } from './../models/Brief'

export class BriefController {

  public async list(query: any) {
    try {
      const limit = parseInt(query.limit, 10) || 20
      const offset = parseInt(query.offset, 10) || 0

      const briefs = await Brief.find({})
                        .limit(limit)
                        .skip(offset)
                        .exec()

      const total = await Brief.countDocuments({})

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
        meta: {
          total,
        },
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
      const result = await Brief.findByIdAndRemove(params.briefId).exec()
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  /** Private methods */

  private generateSelf(brief?: IBrief) {
    const self: ReadonlyArray<any> = [
      {
        href: `${process.env.HOSTNAME}/briefs${ brief ? `/${brief._id}` : '{?offset,limit}' }`,
        method: 'GET',
        rel: 'self',
      },
    ]

    if (brief) {
      return [
        ...self,
        {
          href: `${process.env.HOSTNAME}/briefs/${brief._id}`,
          method: 'PATCH',
          rel: 'patchBrief',
        },
        {
          href: `${process.env.HOSTNAME}/briefs/${brief._id}`,
          method: 'DELETE',
          rel: 'deleteBrief',
        },
        {
          href: `${process.env.HOSTNAME}/briefs/${brief._id}/submissions`,
          method: 'POST',
          rel: 'createSubmission',
        },
      ]
    }
    return self
  }

  private generateLinks(brief) {
    return [
      {
        href: `${process.env.HOSTNAME}/briefs/${brief._id}/submissions{?offset,limit}`,
        method: 'GET',
        rel: 'listSubmissions',
      },
    ]
  }
}

export default BriefController
