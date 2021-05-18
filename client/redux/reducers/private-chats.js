import axios from 'axios'

import types from '../types'
import ws from '../../../_common/ws-action-types'

const initialState = { selected: '', list: {}, usersOnline: [] }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.PRIVATE_CHATS.GET_PRIVATE_CHATS: {
      return { ...state, list: action.list }
    }
    case ws.CHAT.UPDATE_USERS_ONLINE: {
      return { ...state, usersOnline: [...new Set(action.usersOnline)] }
    }
    default:
      return state
  }
}

export function getPrivateChats() {
  return (dispatch) => {
    axios({
      url: '/api/v1/private-chats',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({ data }) => {
        dispatch({ type: types.PRIVATE_CHATS.GET_PRIVATE_CHATS, list: data })
      })
      .catch((r) => {
        dispatch({ type: types.UI.SHOW_ERROR_MESSAGE, errorText: r.response.data.error })
      })
  }
}
