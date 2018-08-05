import { Request, Response, Router } from 'express'

const getRoot = (req: Request, res: Response) => {
  res.json({
    links: [
      {
        href: 'http://localhost/api/auth/signIn',
        method: 'POST',
        rel: 'signIn',
      },
      {
        href: 'http://localhost/api/auth/signUp',
        method: 'POST',
        rel: 'signUp',
      },
    ],
  })
}

export default Router().get('/', getRoot)
