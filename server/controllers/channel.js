import jwt from 'jsonwebtoken'

import config from '../config'
import Channel from '../model/Channel.model'

async function create(req, res) {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    let channel = new Channel({ title: req.body.title, type: req.body.type, users: [jwtUser.uid] })
    channel = await channel.save()
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
    let channels = await Channel.getChannels(jwtUser.uid)
    channels = channels.reduce((acc, rec) => {
      return {
        ...acc,
        [rec.title]: {
          cid: rec._id,
          users: rec.users,
          messages: rec.messages
        }
      }
    }, {})
    res.json({ message: `Channels list loaded succesfully`, channels })
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

export default { create, all }
