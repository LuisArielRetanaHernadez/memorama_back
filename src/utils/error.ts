const sendError = (req, res, next, error) => {
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something went wrong.',
      stack: error.stack,
    }
  })
}

export default sendError