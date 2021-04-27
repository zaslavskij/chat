import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'

const TYPE_PASSWORD = 'TYPE_PASSWORD'
const TYPE_EMAIL = 'TYPE_EMAIL'
const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const TRY_LOGIN = 'TRY_LOGIN'
const KILL_SESSION = 'KILL_SESSION'

const cookies = new Cookies()

const initialState = {
  email: '',
  password: '',
  user: {},
  token: cookies.get('token')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case TYPE_EMAIL: {
      return { ...state, email: action.email }
    }
    case LOGIN: {
      return { ...state, user: action.user, token: action.token, password: '' }
    }
    case TRY_LOGIN: {
      return { ...state, user: action.user, token: action.token, password: '' }
    }
    case KILL_SESSION: {
      return { ...state, token: '', user: {} }
    }
    case REGISTER: {
      return { ...state, token: action.token, user: action.user, password: '' }
    }
    default:
      return state
  }
}

export function typePassword(password) {
  return { type: TYPE_PASSWORD, password }
}

export function typeEmail(email) {
  return { type: TYPE_EMAIL, email }
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

    dispatch({ type: LOGIN, user: data.user, token: data.token })
    history.push('/chat')
  }
}

export function tryLogin() {
  return async (dispatch) => {
    const { data } = await axios({
      url: '/api/v1/auth',
      method: 'get'
    }).catch(console.log)
    dispatch({ type: TRY_LOGIN, user: data.user, token: data.token })
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
    dispatch({ type: REGISTER, user: data.user, token: data.token })
    history.push('/chat')
  }
}

export function killSession() {
  return { type: KILL_SESSION }
}
