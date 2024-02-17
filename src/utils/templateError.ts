import { StatusResponse } from '../types/types'

class TemplateError extends Error {
  status: StatusResponse
  constructor (message: string, status: StatusResponse) {
    super(message)
    this.name = 'TemplateError'
    this.status = status
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

export default TemplateError
