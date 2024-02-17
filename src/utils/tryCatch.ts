import { Request, Response, NextFunction } from 'express'

const tryCatch = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  return fn(req, res, next).catch(next)
}

export default tryCatch
