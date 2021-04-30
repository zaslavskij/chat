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
    type: [Object],
    default: []
  }
})

export default mongoose.model('channels', channelsSchema)
