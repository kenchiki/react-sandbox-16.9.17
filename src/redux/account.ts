import { ActionTypes } from './ActionTypes'

const initialState = {
  isLogin: false
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
