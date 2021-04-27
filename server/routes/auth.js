import express from 'express'
import jwt from 'jsonwebtoken'

import config from '../config'
import User from '../model/User.model'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    let user = await User.findAndValidateUser(req.body)
    user = user.toObject()
    const payload = { uid: user._id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password

    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', user, token })
  } catch (err) {
    res.json({ status: 'error', message: `Error occured: ${err}` })
  }
})

router.get('/', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)

    const payload = { uid: user._id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

export default router
