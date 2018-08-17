import Submission, { ISubmission } from './../models/Submission'

export class SubmissionController {

  public async list(params: any, query: any) {
    try {
      const limit = parseInt(query.limit, 10) || 20
      const offset = parseInt(query.offset, 10) || 0

      const submissions = await Submission.find({ brief: params.briefId })
                          .limit(limit)
                          .skip(offset)
                          .exec()

      const total = await Submission.countDocuments({ brief: params.briefId })

      return {
        data: submissions.map((item) => {
          const submission = item.toJSON()
          return {
            ...submission,
            links: this.generateSelf(params.briefId, submission),
          }
        }),
        links: this.generateSelf(params.briefId),
        meta: {
          total,
        },
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  public async show(params: any) {
    try {
      const result = await Submission.findById(params.submissionId).exec()
      const submission = result && result.toJSON()
      return {
        data: submission,
        links: this.generateSelf(params.briefId, submission),
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  /** Private methods */

  private generateSelf(briefId: string, submission?: ISubmission) {
    const prefix = `${process.env.HOSTNAME}/briefs/${briefId}`
    const self: ReadonlyArray<any> = [
      {
        href: `${prefix}/submissions${ submission ? `/${submission._id}` : '{?offset,limit}' }`,
        method: 'GET',
        rel: 'self',
      },
    ]

    if (submission) {
      return [
        ...self,
        {
          href: `${prefix}/submissions/${submission._id}`,
          method: 'PATCH',
          rel: 'patchSubmission',
        },
        {
          href: `${prefix}/submissions/${submission._id}`,
          method: 'DELETE',
          rel: 'deleteSubmission',
        },
      ]
    }
    return self
  }

}

export default SubmissionController
