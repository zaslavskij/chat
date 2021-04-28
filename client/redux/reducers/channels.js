import types from '../types'

const initialState = {
  selected: 'general',
  list: {
    general: {
      users: [],
      messages: [{ timestamp: +new Date(), nickname: 'me', message: '**some** awesome text' }]
    },
    Other: {
      users: [],
      messages: []
    }
  }
}

export default function channels(state = initialState, action) {
  switch (action.type) {
    case types.CHANNEL.SELECT_CHANNEL: {
      return { ...state, selected: action.selected }
    }
    case types.CHANNEL.SEND_MESSAGE: {
      return {
        ...state,
        list: {
          ...state.list,
          [action.selected]: {
            ...state.list[action.selected],
            messages: [
              ...state.list[action.selected].messages,
              { nickname: action.nickname, timestamp: +new Date(), message: action.message }
            ]
          }
        }
      }
    }
    default:
      return state
  }
}

export function selectChannel(selected) {
  return { type: types.CHANNEL.SELECT_CHANNEL, selected }
}
export function sendMessage(message) {
  return (dispatch, getState) => {
    const {
      user: {
        user: { nickname }
      },
      channels: { selected }
    } = getState()

    return dispatch({ type: types.CHANNEL.SEND_MESSAGE, selected, message, nickname })
  }
}
