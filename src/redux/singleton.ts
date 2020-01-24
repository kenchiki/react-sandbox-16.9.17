import Pet from '../lib/Pet'
import Account from '../lib/Account'

const account: Account = new Account()
const pet: Pet = new Pet(account)

const initialState = {
  // シングルトン
  pet: pet,
  account: account
}

export default function (state = initialState) {
  return state
}
