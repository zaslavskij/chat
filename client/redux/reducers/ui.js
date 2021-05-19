import types from '../types'

const initialState = {
  asideShown: true,
  selected: {
    type: 'channels',
    name: 'general'
  }
}

export default function responsive(state = initialState, action) {
  switch (action.type) {
    case types.UI.ASIDE_TOGGLE: {
      return { ...state, asideShown: action.val }
    }
    default:
      return state
  }
}

export function asideToggle(val) {
  return { type: types.UI.ASIDE_TOGGLE, val }
}
