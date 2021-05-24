import express from 'express'
import userController from '../controllers/user'

import { validateUserBody } from '../validation/user'

const router = express.Router()

router.post(
  '/',
  (req, res, next) => validateUserBody(req, res, next),
  (req, res, next) => userController.login(req, res, next)
)

router.get('/', userController.auth)

export default router
