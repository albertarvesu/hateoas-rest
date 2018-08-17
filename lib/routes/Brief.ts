import { Request, Response, Router } from 'express'

import BriefController from './../controllers/BriefController'

const briefController = new BriefController()

const list = async (req: Request, res: Response) => {
  try {
    res.json(await briefController.list(req.query))
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    res.json(await briefController.show(req.params))
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const router = Router()

router
  .get('/', list)
  .get('/:briefId', show)
  // .post('/', create)
  // .patch('/', patch)

export default router
