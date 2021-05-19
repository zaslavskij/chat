import { format } from 'date-fns'
import Channel from '../../../model/Channel.model'
import ws from '../../../../_common/ws-action-types'

// eslint-disable-next-line
export async function sendMessage(action, connections) {
  const timestamp = +new Date()

  const message = {
    channel: action.channel,
    message: action.message,
    nickname: action.nickname,
    date: format(timestamp, 'MM/dd/yyyy'),
    time: format(timestamp, 'HH:MM:SS'),
    timestamp
  }

  await Channel.addPost(message)

  connections
    .filter(
      (cn) =>
        typeof cn.userInfo !== 'undefined' &&
        typeof cn.userInfo.channels !== 'undefined' &&
        cn.userInfo.channels.includes(action.channel)
    )
    .forEach((c) => {
      c.write(JSON.stringify({ ...message, type: ws.CHAT.SEND_TO_CLIENT }))
    })
}
