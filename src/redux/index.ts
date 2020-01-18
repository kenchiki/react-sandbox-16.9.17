import { createStore, combineReducers } from 'redux'
import todos from './todos'

const rootReducer = combineReducers({ todos })
export default createStore(rootReducer)
