import { format } from 'date-fns'
import Channel from '../../model/Channel.model'
import ws from '../../../_common/ws-action-types'
import { validatePostWS } from '../../validation/channel'

// eslint-disable-next-line
export async function sendMessage(action, connections) {
  const timestamp = +new Date()

  const currConnection = connections.find((c) => c.userInfo.nickname === action.nickname)

  try {
    let message = validatePostWS({
      cid: action.cid,
      message: action.message,
      nickname: action.nickname,
      timestamp
    })()

    message = {
      ...message,
      date: format(timestamp, 'MM/dd/yyyy'),
      time: format(timestamp, 'HH:MM:SS')
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
