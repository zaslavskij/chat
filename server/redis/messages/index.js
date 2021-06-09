import redis from 'redis'
import config from '../../config'
import Channel from '../../model/Channel.model'

let msgsQ = {}

export function initialize() {
  const subscriber = redis.createClient(
    config.env !== 'development' ? process.env.HEROKU_REDIS_MAROON_URL : ''
  )

  // eslint-disable-next-line
  subscriber.on('message', function (channel, message) {
    const msgParsed = JSON.parse(message)
    if (channel === 'chat_msgs') {
      msgsQ = {
        ...msgsQ,
        [msgParsed.cid]:
          typeof msgsQ[msgParsed.cid] !== 'undefined'
            ? [...msgsQ[msgParsed.cid], msgParsed]
            : [msgParsed]
      }
    }
  })

  subscriber.subscribe('chat_msgs')

  setInterval(async () => {
    if (Object.values(msgsQ).length > 0) {
      Channel.saveMessagesQueue(msgsQ)
      msgsQ = {}
    }
  }, 1000 * 60 * 5)
}

const publisher = redis.createClient(
  config.env !== 'development' ? process.env.HEROKU_REDIS_MAROON_URL : ''
)
export const sendToQueue = (message) => {
  publisher.publish('chat_msgs', JSON.stringify(message))
}

export const getRedisMessages = () => msgsQ

export function clearRedisMessages() {
  msgsQ = {}
}
