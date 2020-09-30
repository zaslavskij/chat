import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'

const SET_EMAIL = 'SET_EMAIL'
const SET_PASSWORD = 'SET_PASSWORD'
const AUTH = 'AUTH'

const cookies = new Cookies()

const initialState = {
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL: {
      return { ...state, email: action.email }
    }
    case SET_PASSWORD: {
      return { ...state, password: action.password }
    }
    case AUTH: {
      return { ...state, token: action.token, password: '', user: action.user }
    }
    default:
      return state
  }
}

export function setEmail(email) {
  return { type: SET_EMAIL, email }
}

export function setPassword(password) {
  return { type: SET_PASSWORD, password }
}

export function createUser() {
  return (dispatch, getState) => {
    const { email, password } = getState().reg

    axios({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: '/api/v1/register',
      data: JSON.stringify({ email, password })
    })
  }
}

export function authUser() {
  return async (dispatch, getState) => {
    const { email, password } = getState().reg

    const {
      data: { token, user }
    } = await axios({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: '/api/v1/auth',
      data: JSON.stringify({ email, password })
    })

    dispatch({ type: AUTH, token, user })

    history.push('/chat')
  }
}

export function validateUser() {
  return (dispatch) => {
    axios('/api/v1/auth').then(({ data }) => {
      dispatch({ type: AUTH, token: data.token, user: data.user })
      history.push('/chat')
    })
  }
}
export function tryGetUserInfo() {
  return () => {
    axios('/api/v1/user-info').then(({ data }) => {
      // eslint-disable-next-line
      console.log(data)
    })
  }
}
