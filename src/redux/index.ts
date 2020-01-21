import { createStore, combineReducers } from 'redux'
import account from './account'

const rootReducer = combineReducers({ account })
export default createStore(rootReducer)
