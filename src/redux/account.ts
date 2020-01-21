import { ActionTypes } from './ActionTypes'
import Account from '../lib/Account'

const account = new Account()
const initialState = {
  isLogin: account.isLogin()
}

interface Action {
  type: ActionTypes;
  payload: any;
}

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.Login: {
      return {
        ...state,
        isLogin: true
      }
    }
    case ActionTypes.Logout: {
      return {
        ...state,
        isLogin: false
      }
    }
    default:
      return state
  }
}
