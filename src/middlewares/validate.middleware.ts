import { NextFunction, Request, Response } from 'express'
import { validationResult, ContextRunner } from 'express-validator'
import TemplateError from '../utils/templateError'

export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req)
      if (result.context.errors.length > 0) break
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    return next(new TemplateError(errors.array().toString(), 400))
  }
}
