import types from '../types'
import ws from '../../../_common/ws-action-types'
import { getSocket } from '..'

const initialState = { selected: '', list: {} }

export default function channelsReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANNEL.GET_CHANNELS: {
      return { ...state, selected: Object.keys(action.channels)[0], list: action.channels }
    }
    case types.CHANNEL.CREATE_CHANNEL: {
      return {
        ...state,
        selected: action.title,
        list: {
          ...state.list,
          [action.title]: { _id: action._id, users: action.users, messages: action.messages }
        }
      }
    }
    case types.CHANNEL.SELECT_CHANNEL: {
      return { ...state, selected: action.selected }
    }
    case ws.CHAT.SEND_TO_CLIENT: {
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

export function createChannel(t) {
  return async (dispatch) => {
    fetch('/api/v1/channels/new', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ title: t })
    })
      .then((r) => r.json())
      .then(({ channel: { title, messages, users, _id } }) => {
        return dispatch({ type: types.CHANNEL.CREATE_CHANNEL, title, messages, users, _id })
      })
  }
}

export function sendMessage(message) {
  return (dispatch, getState) => {
    const {
      user: {
        user: { nickname }
      },
      channels: { selected }
    } = getState()

    getSocket().send(JSON.stringify({ type: ws.CHAT.SEND_TO_SERVER, message, nickname, selected }))
  }
}

export function getChannels() {
  return (dispatch) => {
    fetch('/api/v1/channels/all', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then((r) => r.json())
      .then(({ channels }) => {
        return dispatch({ type: types.CHANNEL.GET_CHANNELS, channels })
      })
  }
}
