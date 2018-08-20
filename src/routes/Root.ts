import { Request, Response, Router } from 'express'

const getRoot = (req: Request, res: Response) => {
  res.json([
    {
      href: `${process.env.HOSTNAME}/auth/signIn`,
      method: 'POST',
      rel: 'signIn',
    },
    {
      href: `${process.env.HOSTNAME}/auth/signUp`,
      method: 'POST',
      rel: 'signUp',
    },
  ])
}

export default Router().get('/', getRoot)
