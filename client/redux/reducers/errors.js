import types from '../types'
import ws from '../../../_common/ws-action-types/chat'

const initialState = {
  errorShown: false,
  errorText: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ws.SEND_ERROR_TO_CLIENT: {
      return { ...state, errorShown: true, errorText: action.errorText }
    }
    case types.UI.SHOW_ERROR_MESSAGE: {
      return { ...state, errorShown: true, errorText: action.errorText }
    }
    case types.UI.HIDE_ERROR_MESSAGE: {
      return { ...state, errorShown: false, errorText: '' }
    }
    default:
      return state
  }
}

export function hideError() {
  return { type: types.UI.HIDE_ERROR_MESSAGE }
}

export function showError(errorText) {
  return { type: types.UI.SHOW_ERROR_MESSAGE, errorText }
}
