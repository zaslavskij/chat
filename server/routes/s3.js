import express from 'express'
import s3 from '../services/s3'

const router = express.Router()

router.post('/image', async (req, res) => {
  await s3
    .uploadObject(
      req.files.myFile.name,
      req.files.myFile.mimetype,
      Buffer.from(req.files.myFile.data, 'binary')
    )
    .then((r) => console.log('RESPONSE', r))

  res.json({ status: 'ok' })
})

export default router
