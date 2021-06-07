import { format } from 'date-fns'
import Channel from '../../model/Channel.model'
import ws from '../../../_common/ws-action-types'
import { validatePostDirectly } from '../../validation/channel'
import * as redisQueue from '../../redis/messages'

redisQueue.initialize()

// eslint-disable-next-line
export async function sendMessage(action, connections) {
  const timestamp = +new Date()

  const currConnection = connections.find(
    (c) =>
      typeof c.userInfo !== 'undefined' &&
      c.userInfo.nickname !== 'undefined' &&
      c.userInfo.nickname === action.nickname
  )

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
      channelType: action.channelType,
      title: action.title
    }

    redisQueue.sendToQueue(message)

    connections
      .filter((cn) => {
        return (
          typeof cn.userInfo !== 'undefined' &&
          typeof cn.userInfo.channelsCommonIds !== 'undefined' &&
          cn.userInfo.channelsCommonIds.includes(action.cid)
        )
      })
      .forEach((c) => {
        if (c.userInfo.nickname !== message.title)
          c.write(
            JSON.stringify({
              ...message,
              type: ws.CHAT.SEND_TO_CLIENT
            })
          )
        else
          c.write(
            JSON.stringify({
              ...message,
              title: action.nickname,
              type: ws.CHAT.SEND_TO_CLIENT
            })
          )
      })
  } catch (err) {
    currConnection.write(
      JSON.stringify({ type: ws.CHAT.SEND_ERROR_TO_CLIENT, errorText: err.toString() })
    )
  }
}

export async function clearMessages(action, connections) {
  const currConnection = connections.find(
    (c) =>
      typeof c.userInfo !== 'undefined' &&
      c.userInfo.nickname !== 'undefined' &&
      c.userInfo.nickname === action.nickname
  )
  try {
    const { cid, title, channelType } = action
    await Channel.clearMessages(cid)

    connections
      .filter((cn) => {
        return (
          typeof cn.userInfo !== 'undefined' &&
          typeof cn.userInfo.channelsCommonIds !== 'undefined' &&
          cn.userInfo.channelsCommonIds.includes(action.cid)
        )
      })
      .forEach((c) => {
        if (c.userInfo.nickname !== action.title) {
          c.write(
            JSON.stringify({ type: ws.CHAT.SEND_TO_CLIENT_CLEAR_HISTORY, cid, title, channelType })
          )
        } else {
          c.write(
            JSON.stringify({
              type: ws.CHAT.SEND_TO_CLIENT_CLEAR_HISTORY,
              cid,
              title: action.nickname,
              channelType
            })
          )
        }
      })
  } catch (err) {
    currConnection.write(
      JSON.stringify({ type: ws.CHAT.SEND_ERROR_TO_CLIENT, errorText: err.toString() })
    )
  }
}
