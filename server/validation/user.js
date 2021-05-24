import Joi from 'joi'
import { validateRequest } from '.'

const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).max(16).required()
})

// eslint-disable-next-line
export function validateUserBody(req, res, next) {
  validateRequest(req, res, next, userSchema)
}
