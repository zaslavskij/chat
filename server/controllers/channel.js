import jwt from 'jsonwebtoken'
import ObjectID from 'bson-objectid'

import sharp from 'sharp'

import config from '../config'
import s3 from '../services/s3'
import { getWsConnections } from '../websockets'
import { sendMessage } from '../websockets/ws-controller/channel'
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
    const extension = req.files.image.mimetype.split('/').pop()
    const fileName = `${new ObjectID().toString()}.${extension}`

    const file = await sharp(req.files.image.data).resize(550).jpeg({ mozjpeg: true }).toBuffer()

    await s3
      .uploadObject(fileName, req.files.image.mimetype, Buffer.from(file, 'binary'))
      .then(async (imagePath) => {
        const url = `https://imena.s3.amazonaws.com/${imagePath}`
        const connections = getWsConnections()
        const message = {
          cid: req.body.cid,
          message: `[${url}](${url})
          ![alt text](${url} "alt text")`,
          nickname: req.body.nickname,
          title: req.body.title,
          channelType: req.body.channelType
        }

        await sendMessage(message, connections)

        res.json({ status: 'ok' })
      })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export default { create, all, uploadAndPostImageUrl }
