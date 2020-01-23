import axios from 'axios'
import Account, { AccountInfo } from './Account'

export default class Friend {
  public follows: Array<AccountInfo> = []
  private account: Account;

  constructor (account: Account) {
    this.account = account
  }

  public async fetchFollows () {
    const accountInfo: AccountInfo = this.account.info!
    const url = `${this.account.mastodonUrl}/api/v1/accounts/${accountInfo.id}/followers`
    const response = await axios.get(url, {
      params: { limit: 200 },
      headers: { Authorization: `Bearer ${this.account.token}` }
    })
    this.follows = response.data
  }
}
