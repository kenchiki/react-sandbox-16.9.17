import axios from 'axios'
import Account, { AccountInfo } from '../lib/Account'

export interface TootInfo {
  id: string;
  accounts: Array<AccountInfo>
  // eslint-disable-next-line camelcase
  last_status: {
    account: AccountInfo;
    // eslint-disable-next-line camelcase
    created_at: string;
    content: string;
  };
}

export default class Letter {
  public letters: Array<TootInfo> = []
  private to: string | null = null
  private body: string | null = null
  private account: Account;
  static readonly FETCH_LIMIT: number = 20

  constructor (account: Account) {
    this.account = account
  }

  public receivedLetters (): Array<TootInfo> {
    return this.letters.filter((letter: TootInfo) => {
      return letter.last_status.account.id !== this.myAccountId()
    })
  }

  public sentLetters (): Array<TootInfo> {
    return this.letters.filter((letter: TootInfo) => {
      return letter.last_status.account.id === this.myAccountId()
    })
  }

  public async fetchLetters () {
    const response = await axios.get(`${this.account.mastodonUrl}/api/v1/conversations`, {
      params: { limit: Letter.FETCH_LIMIT },
      headers: { Authorization: `Bearer ${this.account.token}` }
    })
    this.letters = response.data
  }

  public async send (to: string, body: string) {
    const postParams = {
      visibility: 'direct',
      status: `${to} ${body}`
    }

    await axios.post(
      `${this.account.mastodonUrl}/api/v1/statuses`,
      postParams,
      {
        headers: { Authorization: `Bearer ${this.account.token}` }
      }
    )
  }

  private myAccountId (): string {
    return (this.account.info as AccountInfo).id
  }
}
