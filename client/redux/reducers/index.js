import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user'
import channels from './channels'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    channels
  })

export default createRootReducer
