import types from '../types'
import ws from '../../../_common/ws-action-types'

const initialState = { selected: '', privateChats: {} }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.PRIVATE_CHATS.GET_PRIVATE_CHATS: {
      return { ...state, privateChats: action.privateChats }
    }
    case ws.PRIVATE_CHATS.UPDATE_USERS_ONLINE: {
      const usersOnline = new Set(action.usersOnline)

      return {
        ...state,
        privateChats: Object.keys(state.privateChats).reduce((acc, rec) => {
          return {
            ...acc,
            [rec]: { ...state.privateChats[rec], online: usersOnline.has(rec) }
          }
        }, {})
      }
    }
    default:
      return state
  }
}
