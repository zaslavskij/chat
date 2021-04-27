import express from 'express'
import jwt from 'jsonwebtoken'

import config from '../config'
import User from '../model/User.model'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    let user = new User({ email, password })
    await user.save()
    const token = jwt.sign({ uid: user._id }, config.secret, { expiresIn: '48h' })
    user = { role: user.role, email: user.email, nikname: user.nickname }
    res.cookie('token', token, { expiresIn: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', message: 'user was successfully registered', user, token })
  } catch (err) {
    res.json({ status: 'error', message: `Error occured: ${err}` })
  }
})

export default router
