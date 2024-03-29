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

    case ws.CHAT.SEND_TO_CLIENT_CLEAR_HISTORY: {
      return {
        ...state,
        [action.channelType]: {
          ...state[action.channelType],
          [action.title]: { ...state[action.channelType][action.title], messages: [] }
        }
      }
    }

    case types.CHANNEL.CHANGE_SELECTION: {
      let chat = localStorage.getItem('chat')
      if (!chat) {
        localStorage.setItem('chat', {
          selection: { channelType: action.channelType, title: action.title }
        })
      } else {
        chat = JSON.parse(chat)
        chat = { ...chat, selection: { channelType: action.channelType, title: action.title } }
      }
      localStorage.setItem('chat', JSON.stringify(chat))
      return { ...state, selection: { channelType: action.channelType, title: action.title } }
    }
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

export function clearChannelHistory() {
  return (dispatch, getState) => {
    const { title, channelType } = getState().channels.selection
    const { cid } = getState().channels[channelType][title]
    const { nickname } = getState().user.user

    getSocket().send(
      JSON.stringify({
        type: ws.CHAT.SEND_TO_SERVER_CLEAR_HISTORY,
        cid,
        nickname,
        title,
        channelType
      })
    )
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
      .catch((r) => {
        console.log(r)
        dispatch({ type: types.UI.SHOW_ERROR_MESSAGE, errorText: r.response.data.error })
      })
  }
}
