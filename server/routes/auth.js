import express from 'express'
import userController from '../controllers/user'

import { validateUserBody } from '../validation/user'

const router = express.Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Basic auth scheme
 */

/**
 * @swagger
 * paths:
 *   /api/v1/auth:
 *     get:
 *      security:
 *        - cookieAuth: []
 *      summary: Auth user with client-side credentials stored in cookies
 *      tags: [auth]
 *      responses:
 *        '200':
 *          description: >
 *            Successfully authenticated.
 *            The session ID is returned in a cookie named `token`. You need to include this cookie in subsequent requests.
 *          headers:
 *            Set-Cookie:
 *              schema:
 *                type: string
 *                example: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGE5ZTViOGY4ZjAyZjBmNzUwZjBlYmUiLCJpYXQiOjE2MjIwMDY2NjIsImV4cCI6MTYyMjE3OTQ2Mn0.1t7d0JxncjwxIL4gN_c9NzZqKu3k_th7hyu1RnxlJWU; Path=/; HttpOnly
 */

router.post(
  '/',
  (req, res, next) => validateUserBody(req, res, next),
  (req, res, next) => userController.login(req, res, next)
)

router.get('/', userController.auth)

export default router
