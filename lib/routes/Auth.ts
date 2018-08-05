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

const router = Router()

router
  .post('/signIn', signIn)
  .post('/signUp', signUp)

export default router
