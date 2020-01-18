import { ActionTypes } from './ActionTypes'

export const addTodo = (text: string) => ({
  type: ActionTypes.Add,
  payload: {
    text
  }
})
