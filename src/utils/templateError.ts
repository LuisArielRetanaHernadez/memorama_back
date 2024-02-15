class TemplateError extends Error {
  status: number
  constructor (message: string, status: number) {
    super(message)
    this.name = 'TemplateError'
    this.status = status
    this.message = message
    Error.captureStackTrace(this, TemplateError)
  }
}

export default TemplateError
