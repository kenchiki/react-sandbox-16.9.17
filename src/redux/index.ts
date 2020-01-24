import { createStore, combineReducers } from 'redux'
import account from './account'
import singleton from './singleton'

const rootReducer = combineReducers({ account, singleton })
export default createStore(rootReducer)
