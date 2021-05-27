import config from '../config'

const aws = require('aws-sdk')

const { accessKey, accessId, region, bucket } = config.s3

const s3 = new aws.S3({
  secretAccessKey: accessKey,
  accessKeyId: accessId,
  region,
  apiVersion: '2006-03-01',
  signatureVersion: 'v4'
})

const uploadObject = (fileName, mimetype, data) => {
  return new Promise((resolve) => {
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: data,
      ContentType: mimetype
    }
    console.log(params)
    s3.upload(params, (s3Err, uploadedData) => {
      console.log(s3Err)
      if (s3Err) throw s3Err
      resolve(uploadedData.Key)
    })
  })
}

const getObject = (key) => {
  return new Promise((resolve) => {
    const params = {
      Bucket: bucket, // pass your bucket name
      Key: key // file will be saved as testBucket/contacts.csv
    }

    s3.getObject(params, (err, jsonData) => {
      if (!err) {
        resolve(Buffer.from(jsonData.Body))
      } else {
        throw err
      }
    })
  })
}

module.exports = {
  getObject,
  uploadObject
}
