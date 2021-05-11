import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'
import types from '../types'

const cookies = new Cookies()

const initialState = {
  email: '',
  password: '',
  user: {},
  token: cookies.get('token')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN.TYPE_PASSWORD: {
      return { ...state, password: action.password }
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
  return async (dispatch, getState) => {
    const { email, password } = getState().user
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
    const { data } = await axios({
      url: '/api/v1/auth',
      method: 'get'
    }).catch(console.log)
    dispatch({ type: types.LOGIN.TRY_LOGIN, user: data.user, token: data.token })
  }
}

export function register() {
  return async (dispatch, getState) => {
    const {
      user: { email, password }
    } = getState()
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
