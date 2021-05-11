import express from 'express'
import channelController from '../controllers/channel'

const router = express.Router()

router.post('/new', channelController.create)

router.get('/all', channelController.all)

export default router
