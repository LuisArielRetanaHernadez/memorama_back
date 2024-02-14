import { Request, Response, NextFunction } from 'express'

const tryCatch = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  return next(fn(req, res, next))
}

export default tryCatch
