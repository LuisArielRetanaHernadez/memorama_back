import { Request, Response, NextFunction } from 'express'

const tryCatch = async <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): Promise<any> => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    next(error)
  }
}

export default tryCatch
