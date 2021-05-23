import axios from 'axios'
import Cookies from 'universal-cookie'
import { history, getSocket } from '..'
import types from '../types'
import ws from '../../../_common/ws-action-types'

const cookies = new Cookies()

const initialState = {
  user: {},
  socketConnected: false,
  token: cookies.get('token')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECTED': {
      return { ...state, socketConnected: true }
    }
    case 'SOCKET_DISCONNECTED': {
      return { ...state, socketConnected: false }
    }

    case types.LOGIN.LOGIN: {
      return { ...state, user: action.user, token: action.token, password: '' }
    }
    case types.LOGIN.TRY_LOGIN: {
      return { ...state, user: action.user, token: action.token, password: '' }
    }
    case types.LOGIN.KILL_SESSION: {
      return { ...state, token: '', user: {} }
    }
    case types.LOGIN.REGISTER: {
      return { ...state, token: action.token, user: action.user, password: '' }
    }
    default:
      return state
  }
}

export function login(email, password) {
  return (dispatch) => {
    axios({
      url: '/api/v1/auth',
      method: 'post',
      data: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({ data }) => {
        dispatch({ type: types.LOGIN.LOGIN, user: data.user, token: data.token })
        history.push('/chat')
      })
      .catch((r) => {
        dispatch({ type: types.UI.SHOW_ERROR_MESSAGE, errorText: r.response.data.error })
      })
  }
}

export function tryLogin() {
  return (dispatch) => {
    axios({
      url: '/api/v1/auth',
      method: 'get'
    })
      .then(({ data }) => {
        dispatch({ type: types.LOGIN.TRY_LOGIN, user: data.user, token: data.token })
      })
      .catch((r) => {
        dispatch({ type: types.UI.SHOW_ERROR_MESSAGE, errorText: r.response.data.error })
      })
  }
}

export function sendSystemHello() {
  return (dispatch, getStore) => {
    const {
      user: { nickname }
    } = getStore().user

    const channelsCommonIds = [
      ...Object.values(getStore().channels.channels).map(({ cid }) => cid),
      ...Object.values(getStore().channels.dialogs).map(({ cid }) => cid)
    ]

    getSocket().send(
      JSON.stringify({ type: ws.CHAT.SYSTEM_USER_HELLO, nickname, channelsCommonIds })
    )
    dispatch({ type: ws.CHAT.SYSTEM_USER_HELLO })
  }
}

export function register(email, password) {
  return (dispatch) => {
    axios({
      url: '/api/v1/register',
      method: 'post',
      data: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({ data }) => {
        dispatch({ type: types.LOGIN.REGISTER, user: data.user, token: data.token })
        history.push('/chat')
      })
      .catch((r) => {
        dispatch({ type: types.UI.SHOW_ERROR_MESSAGE, errorText: r.response.data.error })
      })
  }
}

export function killSession() {
  return { type: types.LOGIN.KILL_SESSION }
}
