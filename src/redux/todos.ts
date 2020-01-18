import { ActionTypes } from './ActionTypes'
import { Item } from '../interface'

const initialState = {
  items: []
}

interface Action {
  type: ActionTypes;
  payload: any;
}

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.Add: {
      const { text }: { text: string } = action.payload
      const newItem: Item = {
        id: Date.now(),
        text: text
      }
      return {
        ...state,
        items: [...state.items, newItem]
      }
    }
    default:
      return state
  }
}
