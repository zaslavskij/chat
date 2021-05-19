import types from '../types'

const initialState = {
  asideShown: true,
  selected: {
    chatType: 'channels',
    name: 'general'
  }
}

export default function responsive(state = initialState, action) {
  switch (action.type) {
    case types.UI.ASIDE_TOGGLE: {
      return { ...state, asideShown: action.val }
    }
    case types.UI.SELECT_CHAT: {
      return { ...state, selected: { chatType: action.chatType, name: action.name } }
    }
    default:
      return state
  }
}

export function asideToggle(val) {
  return { type: types.UI.ASIDE_TOGGLE, val }
}

export function setSelected(chatType, name) {
  return { type: types.UI.SELECT_CHAT, chatType, name }
}
