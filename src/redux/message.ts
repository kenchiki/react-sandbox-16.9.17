import { ActionTypes } from './ActionTypes'

const initialState = {
  message: '　'
}

interface Action {
  type: ActionTypes;
  payload: any;
}

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.SetMessage: {
      const { message }: { message: string } = action.payload
      return {
        ...state,
        message: message
      }
    }
    default:
      return state
  }
}
