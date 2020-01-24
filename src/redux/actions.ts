import { ActionTypes } from './ActionTypes'
import Account from '../lib/Account'

export const login = () => ({
  type: ActionTypes.Login,
  payload: {}
})

export const logout = () => ({
  type: ActionTypes.Logout,
  payload: {}
})

export const resetPet = (account: Account) => ({
  type: ActionTypes.ResetPet,
  payload: { account }
})

export const setMessage = (message: string) => ({
  type: ActionTypes.SetMessage,
  payload: { message }
})
