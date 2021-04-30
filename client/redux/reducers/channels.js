import types from '../types'
import ws from '../../../_common/ws-action-types'
import { getSocket } from '..'

const initialState = {
  selected: 'general',
  list: {
    general: {
      users: [],
      messages: [{ timestamp: +new Date(), nickname: 'me', message: '**some** awesome text' }]
    },
    Other: {
      users: [],
      messages: []
    }
  }
}

export default function channels(state = initialState, action) {
  switch (action.type) {
    case types.CHANNEL.CREATE_CHANNEL: {
      return {
        ...state,
        selected: action.channel,
        list: { ...state.list, [action.channel]: { users: [], messages: [] } }
      }
    }
    case types.CHANNEL.SELECT_CHANNEL: {
      return { ...state, selected: action.selected }
    }
    case types.CHANNEL.SEND_MESSAGE: {
      return {
        ...state,
        list: {
          ...state.list,
          [action.selected]: {
            ...state.list[action.selected],
            messages: [
              ...state.list[action.selected].messages,
              { nickname: action.nickname, timestamp: +new Date(), message: action.message }
            ]
          }
        }
      }
    }
    default:
      return state
  }
}

export function selectChannel(selected) {
  return { type: types.CHANNEL.SELECT_CHANNEL, selected }
}

export function createChannel(channel) {
  return { type: types.CHANNEL.CREATE_CHANNEL, channel }
}

export function sendMessage(message) {
  return (dispatch, getState) => {
    const {
      user: {
        user: { nickname }
      },
      channels: { selected }
    } = getState()
    getSocket().send(JSON.stringify({ type: ws.CHAT.SEND_MESSAGE, message }))
    return dispatch({ type: types.CHANNEL.SEND_MESSAGE, selected, message, nickname })
  }
}
