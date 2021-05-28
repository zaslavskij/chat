import axios from 'axios'
import types from '../types'
import ws from '../../../_common/ws-action-types'
import { getSocket } from '..'

const initialState = {
  selection: {
    channelType: 'channels',
    title: 'general'
  },
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
        selection: { title: Object.keys(action.channels)[0], channelType: 'channels' },
        channels: action.channels,
        dialogs: action.dialogs,
        chatsFetched: true
      }
    }
    case types.CHANNEL.CREATE_CHANNEL: {
      return {
        ...state,
        selection: { ...state.selection, title: action.title },
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

    case types.CHANNEL.CHANGE_SELECTION: {
      return { ...state, selection: { channelType: action.channelType, title: action.title } }
    }
    case types.CHANNEL.GET_URL_MESSAGE:
    case ws.CHAT.SEND_TO_CLIENT: {
      return {
        ...state,
        [action.channelType]: {
          ...state[action.channelType],
          [action.title]: {
            ...state[action.channelType][action.title],
            messages: [
              ...state[action.channelType][action.title].messages,
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
    const { nickname } = getState().user.user
    const { title, channelType } = getState().channels.selection
    const { cid } = getState().channels[channelType][title]

    getSocket().send(
      JSON.stringify({ type: ws.CHAT.SEND_TO_SERVER, message, nickname, cid, title, channelType })
    )
  }
}

export function changeSelection(channelType, title) {
  return { type: types.CHANNEL.CHANGE_SELECTION, channelType, title }
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

export function sendPicture(file) {
  return (dispatch, getState) => {
    const { nickname: nicknameS } = getState().user.user
    const { title: titleS, channelType: channelTypeS } = getState().channels.selection
    const { cid } = getState().channels[channelTypeS][titleS]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('channelType', channelTypeS)
    formData.append('nickname', nicknameS)
    formData.append('title', titleS)
    formData.append('cid', cid)

    axios
      .post('/api/v1/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(
        ({
          data: {
            message: { channelType, title, nickname, timestamp, time, date, message }
          }
        }) => {
          console.log('REDUX', channelType, title, nickname, timestamp, time, date, message)
          dispatch({
            type: types.CHANNEL.GET_URL_MESSAGE,
            channelType,
            title,
            nickname,
            timestamp,
            time,
            date,
            message
          })
        }
      )
      .catch((r) => {
        console.log(r)
        // dispatch({ type: types.UI.SHOW_ERROR_MESSAGE, errorText: r.response.data.error })
      })
  }
}
