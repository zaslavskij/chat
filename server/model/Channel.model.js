import mongoose from 'mongoose'

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

channelsSchema.statics = {
  async addPost({ channel, nickname, message, timestamp, date, time }) {
    const ch = await this.findOne({ title: channel })
    ch.messages.push({ nickname, message, timestamp, date, time })
    await ch.save()
  },

  async getChannels(userId) {
    const channels = await this.find({
      users: mongoose.Types.ObjectId(userId)
    })
    return channels
  }
}

export default mongoose.model('channels', channelsSchema)
