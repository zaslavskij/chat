require('dotenv').config()

const options = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  isSocketsEnabled: process.env.ENABLE_SOCKETS,
  db: process.env.MONGO_URL,
  secret: process.env.SECRET || 'heyThere'
}

export default options
