import axios from 'axios'
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

    case ws.CHANNEL.SEND_TO_CLIENT: {
      return {
        ...state,
        list: {
          ...state.list,
          [action.channel]: {
            ...state.list[action.channel],
            messages: [
              ...state.list[action.channel].messages,
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
      data: JSON.stringify({ title: t }),
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

    getSocket().send(
      JSON.stringify({ type: ws.CHANNEL.SEND_TO_SERVER, message, nickname, channel })
    )
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
    }).then(({ data: { channels, privateChats } }) => {
      dispatch({ type: types.CHANNEL.GET_CHANNELS, channels })
      dispatch({ type: types.PRIVATE_CHATS.GET_PRIVATE_CHATS, privateChats })
    })
  }
}
