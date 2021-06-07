import redis from 'redis'
import Channel from '../../model/Channel.model'

export function initialize() {
  const subscriber = redis.createClient()

  let msgsQ = []

  // eslint-disable-next-line
  subscriber.on('message', function (channel, message) {
    console.log(`queue length is: ${msgsQ.length}`)
    if (channel === 'chat_msgs') {
      if (msgsQ.length === 5) {
        const sendingQ = [...msgsQ]
        msgsQ = []
        Channel.addMultiplePosts(sendingQ)
      } else {
        msgsQ = [JSON.parse(message), ...msgsQ]
      }
    }
  })

  subscriber.subscribe('chat_msgs')
}

const publisher = redis.createClient()
export const sendToQueue = (message) => {
  console.log('it seems it works!!!')
  publisher.publish('chat_msgs', JSON.stringify(message))
}
