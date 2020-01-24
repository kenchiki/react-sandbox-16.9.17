import { createStore, combineReducers } from 'redux'
import account from './account'
import singleton from './singleton'
import message from './message'

const rootReducer = combineReducers({ account, message, singleton })
export default createStore(rootReducer)
