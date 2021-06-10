import Joi from 'joi'
import { validateRequest, validateData } from '.'

const channelSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  type: Joi.valid('dialogs', 'channels').required()
})

const postSchema = Joi.object({
  cid: Joi.string().min(3).max(30).required(),
  message: Joi.string().min(2).max(500).required(),
  nickname: Joi.string().min(3).max(30).required(),
  timestamp: Joi.date().timestamp()
})

export function validateChannelBody(req, res, next) {
  validateRequest(req, res, next, channelSchema)
}

export function validatePostDirectly(data) {
  return validateData(data, postSchema)
}
