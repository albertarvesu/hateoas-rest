import { Request, Response, Router } from 'express'

import AuthController from './../controllers/AuthController'

const authController = new AuthController()

const signIn = async (req: Request, res: Response) => {
  try {
    res.json(await authController.signIn(req.body))
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const signUp = async (req: Request, res: Response) => {
  try {
    res.json(await authController.signUp(req.body))
  } catch (e) {
    res.status(400).send(e.message)
  }
}

export const verify = async (req: Request, res: Response, next) => {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      res.status(403).json({ error: 'Unauthorized!' })
    } else {
      const token = authorization.split(' ')[1]
      const currentUser = await authController.verify(token)

      // tslint:disable-next-line:no-object-mutation
      req.params = { ...req.params, currentUser  }
      next()
    }

  } catch (e) {
    res.status(403).send(e.message)
  }
}

const router = Router()

router
  .post('/signIn', signIn)
  .post('/signUp', signUp)

export default router
