import jwt from 'jsonwebtoken'

import config from '../config'
import Channel from '../model/Channel.model'

async function create(req, res) {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    let channel = new Channel({ title: req.body.title, type: req.body.type, users: [jwtUser.uid] })
    channel = await channel.save()
    await Channel.subscribeUser(jwtUser.uid, req.body.title)
    // eslint-disable-next-line
    res.json({ message: `Channel ${req.body.title} was succesfully created`, channel })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

async function all(req, res) {
  const jwtUser = jwt.verify(req.cookies.token, config.secret)
  try {
    const { channels, dialogs } = await Channel.getChannels(jwtUser.uid)

    res.json({ message: `Channels and dialogs lists loaded succesfully`, channels, dialogs })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

export default { create, all }
