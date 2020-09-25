import mongoose from 'mongoose'
import config from '../config'

mongoose.connection.on('error', () => {
  // eslint-disable-next-line
  console.log('connection to db failed')
  process.exit(1)
})

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line
  console.log('connected to db succesfull')
})

exports.connect = (mongoURL = config.db) => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  return mongoose.connection
}
