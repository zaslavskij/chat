require('dotenv').config()

const options = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  isSocketsEnabled: process.env.ENABLE_SOCKETS,
  DB_URL: process.env.DB_URL,
  secret: process.env.SECRET,

  s3: {
    accessKey: process.env.S3_ACCESS_KEY,
    accessId: process.env.S3_ACCESS_ID,
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET
  }
}

export default options
