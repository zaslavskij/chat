import express from 'express'
import userController from '../controllers/user'

const router = express.Router()

router.post('/', userController.login)

router.get('/', userController.auth)

export default router
