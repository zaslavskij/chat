import express from 'express'

import channel from '../controllers/channel'

const router = express.Router()

router.post('/image', channel.uploadAndPostImageUrl)

export default router
