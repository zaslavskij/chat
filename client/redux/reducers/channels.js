import axios from 'axios'
import types from '../types'
import ws from '../../../_common/ws-action-types'
import { getSocket } from '..'

const initialState = {
  selected: '',
  channels: {},
  dialogs: {},
  chatsFetched: false,
  usersOnline: []
}

export default function channelsReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANNEL.GET_CHANNELS: {
      return {
        ...state,
        selected: Object.keys(action.channels)[0],
        channels: action.channels,
        dialogs: action.dialogs,
        chatsFetched: true
      }
    }
    case types.CHANNEL.CREATE_CHANNEL: {
      return {
        ...state,
        selected: action.title,
        channels: {
          ...state.channels,
          [action.title]: { _id: action._id, users: action.users, messages: action.messages }
        }
      }
    }
    case types.CHANNEL.SELECT_CHANNEL: {
      return { ...state, selected: action.selected }
    }

    case ws.CHAT.UPDATE_USERS_ONLINE: {
      const usersOnline = new Set(action.usersOnline)
      return {
        ...state,
        dialogs: Object.keys(state.dialogs).reduce(
          (acc, rec) => ({
            ...acc,
            [rec]: { ...state.dialogs[rec], online: usersOnline.has(rec) }
          }),
          {}
        )
      }
    }

    case ws.CHAT.SEND_TO_CLIENT: {
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.channel]: {
            ...state.channels[action.channel],
            messages: [
              ...state.channels[action.channel].messages,
              {
                nickname: action.nickname,
                timestamp: action.timestamp,
                time: action.time,
                date: action.date,
                message: action.message
              }
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
    axios({
      url: '/api/v1/channels/new',
      method: 'post',
      data: JSON.stringify({ title: t, type: 'channel' }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
        ({
          data: {
            channel: { title, messages, users, _id }
          }
        }) => {
          return dispatch({ type: types.CHANNEL.CREATE_CHANNEL, title, messages, users, _id })
        }
      )
      .catch((r) => {
        dispatch({ type: types.UI.SHOW_ERROR_MESSAGE, errorText: r.response.data.error })
      })
  }
}

export function sendMessage(message) {
  return (dispatch, getState) => {
    const {
      user: {
        user: { nickname }
      },
      channels: { selected: channel }
    } = getState()

    getSocket().send(JSON.stringify({ type: ws.CHAT.SEND_TO_SERVER, message, nickname, channel }))
  }
}

export function getChannels() {
  return (dispatch) => {
    axios({
      url: '/api/v1/channels/all',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(({ data: { channels, dialogs } }) => {
      return dispatch({ type: types.CHANNEL.GET_CHANNELS, channels, dialogs })
    })
  }
}
