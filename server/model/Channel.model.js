import mongoose from 'mongoose'
import User from './User.model'

import ChatException from '../services/errors/chat'

const channelsSchema = new mongoose.Schema({
  title: {
    required() {
      return this.type === 'channel'
    },
    type: String,
    unique: true
  },
  users: {
    type: [Object],
    default: []
  },
  type: {
    type: String,
    enum: ['channel', 'dialog'],
    required: true
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
      new ChatException('Chat with the name provided is already existing', 'CHANNEL_DUPLICATING')
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
      throw new Error('No credentials to write posts at the channel')
    }
  },

  async getChannels(userId) {
    let channels = await this.find({
      users: mongoose.Types.ObjectId(userId),
      type: 'channel'
    })

    channels = channels.reduce(
      (acc, rec) => ({
        ...acc,
        [rec.title]: {
          cid: rec._id,
          users: rec.users,
          messages: rec.messages
        }
      }),
      {}
    )

    let dialogs = await this.find({
      users: { $elemMatch: { id: mongoose.Types.ObjectId(userId) } },
      type: 'dialog'
    })

    dialogs = dialogs.reduce((acc, rec) => {
      return {
        ...acc,
        [rec.users.find((u) => u._id !== userId).nickname]: {
          id: rec._id,
          messages: rec.messages,
          users: rec.users
        }
      }
    }, {})

    console.log(dialogs)

    return { channels, dialogs }
  },

  async subscribeUser(userId, title) {
    const channel = await this.findOne({ title })
    channel.users.push(mongoose.Types.ObjectId(userId))
    await channel.save()
  },

  async initNewDialogs(userId) {
    const users = await User.find({ _id: { $ne: userId } })
    const currentUser = await User.findOne({ _id: userId })
    await Promise.all(
      users.map(async (u) => {
        const privateChat = new this({
          users: [
            { nickname: u.nickname, id: u._id },
            { id: currentUser._id, nickname: currentUser.nickname }
          ],
          type: 'dialog'
        })
        await privateChat.save()
      })
    )
  }
}

export default mongoose.model('channels', channelsSchema)
