import axios from 'axios'

const SET_EMAIL = 'SET_EMAIL'
const SET_PASSWORD = 'SET_PASSWORD'

const initialState = {
  email: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL: {
      return { ...state, email: action.email }
    }
    case SET_PASSWORD: {
      return { ...state, password: action.password }
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
  return (dispatch, getState) => {
    const { email, password } = getState().reg

    axios({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: '/api/v1/auth',
      data: JSON.stringify({ email, password })
    })
  }
}
