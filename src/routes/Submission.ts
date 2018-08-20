import { Request, Response, Router } from 'express'

import SubmissionController from './../controllers/SubmissionController'

const submissionController = new SubmissionController()

const list = async (req: Request, res: Response) => {
  try {
    res.json(await submissionController.list(req.params, req.query))
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    res.json(await submissionController.show(req.params))
  } catch (e) {
    res.status(400).send(e.message)
  }
}

// const create = async (req: Request, res: Response) => {
//   try {
//     res.json(await briefController.create(req.body))
//   } catch (e) {
//     res.status(400).send(e.message)
//   }
// }

const patch = async (req: Request, res: Response) => {
  try {
    res.json(await submissionController.patch(req.params, req.body))
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    await submissionController.remove(req.params)
    res.status(204).send('Success')
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const router = Router({ mergeParams: true })

router
  .get('/', list)
  .get('/:submissionId', show)
  // .post('/', create)
  .patch('/:submissionId', patch)
  .delete('/:submissionId', remove)

export default router
