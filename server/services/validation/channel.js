import Joi from 'joi'
import validateRequest from '.'

const channelSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  type: Joi.valid('dialogs', 'channels').required()
})

const postSchema = Joi.object({
  cid: Joi.string().min(3).max(30).required(),
  message: Joi.string().min(40).max(400).required(),
  nickname: Joi.string().min(3).max(30).required(),
  timestamp: Joi.date().timestamp()
})

function validateChannelBody(req, res, next) {
  validateRequest(req, res, next, channelSchema)
}

function validatePostBody(req, res, next) {
  validateRequest(req, res, next, postSchema)
}

module.exports = {
  validateChannelBody,
  validatePostBody
}
