import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user'
import channels from './channels'
import privateChats from './private-chats'
import ui from './ui'
import errors from './errors'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    channels,
    privateChats,
    ui,
    errors
  })

export default createRootReducer
