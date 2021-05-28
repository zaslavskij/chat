import jwt from 'jsonwebtoken'
import ObjectID from 'bson-objectid'
import { format } from 'date-fns'

import config from '../config'
import s3 from '../services/s3'
import Channel from '../model/Channel.model'
import { validatePostDirectly } from '../validation/channel'

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
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const { channels, dialogs } = await Channel.getChannels(jwtUser.uid)

    res.json({ message: `Channels and dialogs lists loaded succesfully`, channels, dialogs })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

async function uploadAndPostImageUrl(req, res) {
  try {
    const fileName = `${new ObjectID().toString()}.${req.files.image.mimetype.split('/').pop()}`
    await s3
      .uploadObject(fileName, req.files.image.mimetype, Buffer.from(req.files.image.data, 'binary'))
      .then(async (imagePath) => {
        const url = `https://imena.s3.amazonaws.com/${imagePath}`
        const timestamp = +new Date()
        let message = validatePostDirectly({
          cid: req.body.cid,
          message: `[${url}](${url})`,
          nickname: req.body.nickname,
          timestamp
        })

        message = {
          ...message,
          date: format(timestamp, 'MM/dd/yyyy'),
          time: format(timestamp, 'HH:MM:SS')
        }
        console.log(message)
        console.log(message)
        console.log(message)
        console.log(message)
        console.log(message)
        await Channel.addPost(message)
        res.json({ status: 'ok', message })
      })
  } catch (err) {
    console.log(err)
    console.log(err)
    console.log(err)
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

export default { create, all, uploadAndPostImageUrl }
