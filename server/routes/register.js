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
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the channel.
 *         email:
 *           type: string
 *           description: Users's email
 *         password:
 *           type: string
 *           description: Users's password credentials
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *       example:
 *         title: General
 *         type: channel
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API to create user
 */
/**
 * @swagger
 * paths:
 *   /api/v1/register:
 *     post:
 *      summary: Creates a new user
 *      tags: [User]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: Created User.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

router.post('/', validateUserBody, userController.register)

export default router
