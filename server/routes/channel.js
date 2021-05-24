import express from 'express'
import channelController from '../controllers/channel'

import auth from '../middleware/auth'

import { validateChannelBody } from '../validation/channel'

const router = express.Router()

router.post(
  '/new',
  auth(['admin']),
  (req, res, next) => validateChannelBody(req, res, next),
  (req, res, next) => channelController.create(req, res, next)
)

router.get('/all', channelController.all)

export default router
