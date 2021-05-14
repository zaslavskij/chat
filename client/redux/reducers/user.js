import axios from 'axios'
import Cookies from 'universal-cookie'
import { history, getSocket } from '..'
import types from '../types'
import ws from '../../../_common/ws-action-types'

const cookies = new Cookies()

const initialState = {
  email: '',
  password: '',
  user: {},
  socketConnected: false,
  token: cookies.get('token')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN.TYPE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case 'SOCKET_CONNECTED': {
      return { ...state, socketConnected: true }
    }
    case 'SOCKET_DISCONNECTED': {
      return { ...state, socketConnected: false }
    }
    case types.LOGIN.TYPE_EMAIL: {
      return { ...state, email: action.email }
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

export function typePassword(password) {
  return { type: types.LOGIN.TYPE_PASSWORD, password }
}

export function typeEmail(email) {
  return { type: types.LOGIN.TYPE_EMAIL, email }
}

export function login() {
  return async (dispatch, getStore) => {
    const { email, password } = getStore().user
    const { data } = await axios({
      url: '/api/v1/auth',
      method: 'post',
      data: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    dispatch({ type: types.LOGIN.LOGIN, user: data.user, token: data.token })
    history.push('/chat')
  }
}

export function tryLogin() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: '/api/v1/auth',
        method: 'get'
      })

      dispatch({ type: types.LOGIN.TRY_LOGIN, user: data.user, token: data.token })
    } catch (e) {
      console.log(e)
    }
  }
}

export function sendSystemHello() {
  return (dispatch, getStore) => {
    const {
      user: { nickname }
    } = getStore().user

    getSocket().send(JSON.stringify({ type: ws.CHAT.SYSTEM_USER_HELLO, nickname }))
    dispatch({ type: ws.CHAT.SYSTEM_USER_HELLO })
  }
}

export function register() {
  return async (dispatch, getStore) => {
    const {
      user: { email, password }
    } = getStore()
    const { data } = await axios({
      url: '/api/v1/register',
      method: 'post',
      data: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch({ type: types.LOGIN.REGISTER, user: data.user, token: data.token })
    history.push('/chat')
  }
}

export function killSession() {
  return { type: types.LOGIN.KILL_SESSION }
}
