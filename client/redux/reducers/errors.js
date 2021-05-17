import types from '../types'

const initialState = {
  errorShown: false,
  errorText: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UI.SHOW_ERROR: {
      return { ...state, errorShown: true, errorText: action.errorText }
    }
    case types.UI.HIDE_ERROR: {
      return { ...state, errorShown: false, errorText: '' }
    }
    default:
      return state
  }
}
