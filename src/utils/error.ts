import { NextFunction, Request, Response } from 'express'

const sendError = (error: any, _req: Request, res: Response, _next: NextFunction): any => {
  return res.status(error.status).json({
    error: {
      message: error.message,
      stack: error.stack
    }
  })
}

export default sendError
