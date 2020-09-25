import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import reg from './register'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    reg
  })

export default createRootReducer
