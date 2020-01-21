import axios from 'axios'
import { AccountInfo, TootInfo } from '../interface'
import Account from '../lib/Account'

export default class Letter {
  public letters: Array<TootInfo> = []
  private to: string | null = null
  private body: string | null = null
  private account: Account;

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
      params: { limit: 10 },
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
