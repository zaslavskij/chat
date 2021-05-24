import express from 'express'
import userController from '../controllers/user'

import { validateUserBody } from '../validation/user'

const router = express.Router()

router.post('/', validateUserBody, userController.register)

export default router
