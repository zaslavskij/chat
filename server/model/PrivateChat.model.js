import mongoose from 'mongoose'
import User from './User.model'
// import PrivateChatException from '../services/errors/private-chat'

const PrivateChatSchema = new mongoose.Schema(
  {
    users: {
      type: [Object]
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
  },
  { timestamps: true }
)

PrivateChatSchema.statics = {
  async initChatsForNewUser(currentUserId, nickname) {
    const allUsers = await User.find({}).then((users) =>
      users.filter((u) => mongoose.Types.ObjectId(u._id) !== mongoose.Types.ObjectId(currentUserId))
    )

    await Promise.all(
      allUsers.map(async (u) => {
        const newChat = new this({
          users: [
            {
              nickname,
              id: mongoose.Types.ObjectId(currentUserId)
            },
            {
              nickname: u.nickname,
              id: mongoose.Types.ObjectId(u._id)
            }
          ]
        })
        await newChat.save()

        return newChat
      })
    )
  },

  async getPrivateChats(currentUserId, nickname) {
    try {
      const privateChats = await this.find({
        users: { $nin: [mongoose.Types.ObjectId(currentUserId)] }
      })

      return privateChats.reduce((acc, rec) => {
        return { ...acc, [rec.users.find((u) => u.nickname !== nickname).nickname]: { ...rec } }
      }, {})
    } catch (err) {
      throw new Error(err.message)
    } finally {
      // eslint-disable-next-line
      return { message: 'fuck off' }
    }
  }
}

export default mongoose.model('PrivateChat', PrivateChatSchema)
