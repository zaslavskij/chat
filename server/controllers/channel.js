import jwt from 'jsonwebtoken'

import config from '../config'
import Channel from '../model/Channel.model'
import PrivateChat from '../model/PrivateChat.model'

async function create({ body: { title } }, res) {
  try {
    let channel = new Channel({ title })
    channel = await channel.save()
    // eslint-disable-next-line
    res.json({ message: `Channel ${title} was succesfully created`, channel })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function all(req, res) {
  const jwtUser = jwt.verify(req.cookies.token, config.secret)
  try {
    const channels = await Channel.getChannels(jwtUser.uid)
    const privateChats = await PrivateChat.getPrivateChats(jwtUser.uid, jwtUser.nickname)

    res.json({ message: `Channels list loaded succesfully`, channels, privateChats })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

export default { create, all }
