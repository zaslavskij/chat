import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user'
import channels from './channels'
import responsive from './responsive'
import errors from './errors'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    channels,
    responsive,
    errors
  })

export default createRootReducer
