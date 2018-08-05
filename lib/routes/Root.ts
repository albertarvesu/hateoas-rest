import { Request, Response, Router } from 'express'

const getRoot = (req: Request, res: Response) => {
  res.json({
    links: [
      {
        href: 'http://127.0.0.1/api/auth/signIn',
        method: 'POST',
        rel: 'signIn',
      },
      {
        href: 'http://127.0.0.1/api/auth/signUp',
        method: 'POST',
        rel: 'signUp',
      },
    ],
  })
}

export default Router().get('/', getRoot)
