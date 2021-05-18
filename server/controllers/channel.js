import jwt from 'jsonwebtoken'

import config from '../config'
import Channel from '../model/Channel.model'

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
