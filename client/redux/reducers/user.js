import axios from 'axios'
import { history } from '..'

const TYPE_PASSWORD = 'TYPE_PASSWORD'
const TYPE_EMAIL = 'TYPE_EMAIL'
const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'

const initialState = {
  email: '',
  password: '',
  user: '',
  token: ''
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
      return { ...state, user: action.user, password: '' }
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

export function tryLogin() {
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
    console.log(JSON.stringify(data))

    dispatch({ type: LOGIN, user: data.user })
    history.push('/chat')
  }
}

export function tryRegister() {
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
    console.log(data)
    dispatch({ type: REGISTER })
  }
}
