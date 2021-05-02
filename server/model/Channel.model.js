import mongoose from 'mongoose'

const channelsSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    unique: true
  },
  users: {
    type: [String],
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
        author: {
          required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        message: {
          type: String,
          required: true
        }
      }
    ],
    default: []
  }
})

// channelsSchema.methods = {
//   async addPost(channel) {
//     this.
//   }
// }

export default mongoose.model('channels', channelsSchema)
