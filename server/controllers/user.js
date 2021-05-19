import jwt from 'jsonwebtoken'

import config from '../config'
import User from '../model/User.model'
import Channel from '../model/Channel.model'

async function register(req, res) {
  try {
    const { email, password } = req.body
    let user = new User({ email, password })

    await user.save()

    await Channel.subscribeUser(user._id, 'general')
    await Channel.initNewDialogs(user._id)

    const token = jwt.sign({ uid: user._id }, config.secret, { expiresIn: '48h' })
    user = { role: user.role, email: user.email, nickname: user.nickname }
    res.cookie('token', token, { expiresIn: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', message: 'user was successfully registered', user, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

async function login(req, res) {
  try {
    let user = await User.findAndValidateUser(req.body)
    user = user.toObject()
    const payload = { uid: user._id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    user = { role: user.role, email: user.email, nickname: user.nickname }

    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', user, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

async function auth(req, res) {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    let user = await User.findById(jwtUser.uid)

    const payload = { uid: user._id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    user = { role: user.role, email: user.email, nickname: user.nickname }
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

export default { register, login, auth }
