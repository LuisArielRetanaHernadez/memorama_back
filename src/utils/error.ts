const sendError = (_req: any, res: any, _next: Function, error: any): any => {
  return res.status(error.status).json({
    error: {
      message: error.message,
      stack: error.stack
    }
  })
}

export default sendError
