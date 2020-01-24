import Pet from '../lib/Pet'
import Account from '../lib/Account'
import { ActionTypes } from './ActionTypes'

const account: Account = new Account()
const pet: Pet = new Pet(account)

const initialState = {
  // シングルトン
  pet: pet,
  account: account
}

interface Action {
  type: ActionTypes;
  payload: any;
}

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.ResetPet: {
      const { account }: { account: Account } = action.payload
      return {
        ...state,
        pet: new Pet(account)
      }
    }
    default:
      return state
  }
}
