import mongoose from 'mongoose'
import User from './User.model'

import ChannelException from '../services/errors/channel'

const channelsSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    unique: true
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  messages: {
    type: [
      {
        timestamp: {
          required: true,
          type: Date,
          default: Date.now
        },
        nickname: {
          required: true,
          type: String,
          ref: 'User.nickname'
        },
        message: {
          type: String,
          required: true
        },
        date: {
          type: String,
          required: true
        },
        time: {
          type: String,
          required: true
        }
      }
    ],
    default: []
  }
})

channelsSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(
      new ChannelException('Chat with the name provided is already existing', 'CHANNEL_DUPLICATING')
    )
  } else {
    next(error)
  }
})

channelsSchema.statics = {
  async addPost({ channel, nickname, message, timestamp, date, time }) {
    const ch = await this.findOne({ title: channel })
    const user = await User.findOne({ nickname })

    if (ch.users.includes(user._id)) {
      ch.messages.push({ nickname, message, timestamp, date, time })
      await ch.save()
    } else {
      throw new Error('No credentials to wraite posts at the channel')
    }
  },

  async getChannels(userId) {
    let channels = await this.find({
      users: mongoose.Types.ObjectId(userId)
    })
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
    return channels
  },

  async subscribeUser(userId, title) {
    const channel = await this.findOne({ title })
    channel.users.push(mongoose.Types.ObjectId(userId))
    await channel.save()
  }
}

export default mongoose.model('channels', channelsSchema)
