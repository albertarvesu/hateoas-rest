import { Response, Router } from 'express'

import { IAuthUserRequest } from './../models/User'

import MeController from './../controllers/MeController'

const meController = new MeController()

const show = async (req: IAuthUserRequest, res: Response, next) => {
  try {
    res.json(await meController.show(req.currentUser))
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const router = Router()

router
  .get('/', show)

export default router
