export default function validateRequest(req, res, next, schema) {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  })
  if (error) {
    res.status(400).json({
      status: 'error',
      message: `Validation error: ${error.details.map((x) => x.message).join(', ')}`
    })
  } else {
    req.body = value
    next()
  }
}
