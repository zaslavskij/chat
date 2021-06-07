import express from 'express'
import channelController from '../controllers/channel'

import auth from '../middleware/auth'

import { validateChannelBody } from '../validation/channel'

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
 *     Channel:
 *       type: object
 *       required:
 *         - title
 *         - type
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the channel.
 *         title:
 *           type: string
 *           description: Channel's title
 *         users:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of users, who subscribed on channel
 *         type:
 *           type: string
 *           enum:
 *             - channel
 *             - dialog
 *           description: Indicates channel type - classic channel or private dialog
 *         messages:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - timestamp
 *               - nickname
 *               - message
 *             properties:
 *               timestamp:
 *                 type: date
 *                 description: Time post created at
 *               nickname:
 *                 type: string
 *                 description: nickname of post's author
 *               message:
 *                 type: string
 *                 description: message
 *               date:
 *                 type: string
 *                 description: Date in format 'MM/dd/yyyy', based on 'timestamp'
 *               time:
 *                 type: string
 *                 description: Date in format 'HH:MM:SS', based on 'timestamp'
 *           description: Array of all channel's messages
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *       example:
 *         email: steve@jobs.com
 *         type: apple4life4ever
 */

/**
 * @swagger
 * tags:
 *   name: Channel
 *   description: API to manage your posts
 */
/**
 * @swagger
 * paths:
 *   /api/v1/channels/new:
 *     post:
 *      summary: Creates a new channel
 *      tags: [Channel]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Channel'
 *      responses:
 *        "200":
 *          description: The created channel.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Channel'
 */

router.post(
  '/new',
  auth(['admin']),
  (req, res, next) => validateChannelBody(req, res, next),
  (req, res, next) => channelController.create(req, res, next)
)

router.post('/clear-history', channelController.clearMessages)

router.get('/all', channelController.all)

export default router
