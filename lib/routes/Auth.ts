import { Request, Response, Router } from 'express'
import AuthController from './../controllers/AuthController'

// const signIn = (req: Request, res: Response) => {
//   res.json(AuthController.signIn(req.body))
// }

const signUp = async (req: Request, res: Response) => {
  res.json(await AuthController.signUp(req.body))
}

const router = Router()

router
  // .post('/signIn', signIn)
  .post('/signUp', signUp)

export default router
