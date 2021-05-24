import Joi from 'joi'
import validateRequest from '.'

const userSchema = Joi.object({
  email: Joi.email().required(),
  password: Joi.string().min(8).max(16).required()
})

function validateUserBody(req, res, next) {
  validateRequest(req, res, next, userSchema)
}

module.exports = {
  validateUserBody
}
