import mongoose from 'mongoose'

const channelsSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    unique: true
  },
  users: {
    type: [String]
  },
  messages: {
    type: [Object],
    default: []
  }
})

export default mongoose.model('channels', channelsSchema)
