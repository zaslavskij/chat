import { format } from 'date-fns'
import Channel from '../../model/Channel.model'
import ws from '../../../_common/ws-action-types'
import { validatePostDirectly } from '../../validation/channel'

// eslint-disable-next-line
export async function sendMessage(action, connections) {
  console.log(`
  --------------------------------------------------------

  action: ${JSON.stringify(action)}
  connections length: ${connections.length}
  --------------------------------------------------------
  
  
  `)
  const timestamp = +new Date()

  const currConnection = connections.find((c) => c.userInfo.nickname === action.nickname)

  try {
    let message = validatePostDirectly({
      cid: action.cid,
      message: action.message,
      nickname: action.nickname,
      timestamp
    })

    message = {
      ...message,
      date: format(timestamp, 'MM/dd/yyyy'),
      time: format(timestamp, 'HH:MM:SS'),
      channelType: action.channelType
    }

    await Channel.addPost(message)

    connections
      .filter((cn) => {
        return (
          typeof cn.userInfo !== 'undefined' &&
          typeof cn.userInfo.channelsCommonIds !== 'undefined' &&
          cn.userInfo.channelsCommonIds.includes(action.cid)
        )
      })
      .forEach((c) => {
        c.write(
          JSON.stringify({
            ...message,
            type: ws.CHAT.SEND_TO_CLIENT,
            title: action.title,
            channelType: action.channelType
          })
        )
      })
  } catch (err) {
    currConnection.write(
      JSON.stringify({ type: ws.CHAT.SEND_ERROR_TO_CLIENT, errorText: err.toString() })
    )
  }
}
