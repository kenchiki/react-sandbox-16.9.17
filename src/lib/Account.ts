import qs from 'qs'
import axios from 'axios'
import { AccountInfo } from '../interface'

export default class Account {
  // client、tokenどちらを取得する際も同一のものを指定する必要あり（認証のところで無効と表示されてしまうため）
  static readonly API_SCOPE: string = 'read write'
  static readonly APP_NAME: string = '銀河ペット'
  private localStorage: Storage = localStorage
  private sessionStorage: Storage = sessionStorage
  private clientId: string | null = null
  private clientSecret: string | null = null
  public token: string | null = null
  public mastodonUrl: string | null = null
  // title, urls.streaming_api
  public instance: object | null = null
  // display_name, id
  public info: AccountInfo | null = null

  constructor () {
    this.restoreFromStorage()
  }

  private restoreFromStorage () {
    this.token = this.localStorage.getItem('token')!
    this.mastodonUrl = this.localStorage.getItem('mastodon_url')!
    this.clientId = this.localStorage.getItem('client_id')!
    this.clientSecret = this.localStorage.getItem('client_secret')!
    this.instance = JSON.parse(this.localStorage.getItem('instance')!)
    this.info = JSON.parse(this.localStorage.getItem('account')!)
  }

  get avatar (): string { return this.info!.avatar }
  get url (): string { return this.info!.url }
  get name (): string {
    if (!this.info) return ''
    return this.info!.display_name !== '' ? this.info!.display_name : this.info!.username
  }

  // ログインしているか
  public isLogin () {
    return this.token !== null
  }

  // クライアント取得し、コード取得のためにリダイレクト
  async login (mastodonUrl: string) {
    this.setStorage({ key: 'mastodon_url', value: mastodonUrl })
    await this.fetchClient()
    this.fetchCode()
  }

  // mastodonからclient_idとclient_secret取得
  private async fetchClient () {
    const postParams = {
      client_name: Account.APP_NAME,
      redirect_uris: Account.REDIRECT_URI(),
      scopes: Account.API_SCOPE
    }

    const response = await axios.post(
      `${this.mastodonUrl}/api/v1/apps`,
      postParams
    )
    this.setStorage({ key: 'client_id', value: response.data.client_id })
    this.setStorage({ key: 'client_secret', value: response.data.client_secret })
  }

  // mastodonに認証してcode取得
  private fetchCode () {
    const getParams = {
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: Account.REDIRECT_URI(),
      scope: Account.API_SCOPE
    }

    // https://docs.joinmastodon.org/api/authentication/#get-oauth-authorize
    const authUrl = new URL(`${this.mastodonUrl}/oauth/authorize`)
    authUrl.search = qs.stringify(getParams)
    document.location.href = authUrl.href
  }

  // codeからtoken取得
  async fetchToken (code: string) {
    const postParams = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: Account.REDIRECT_URI()
    }

    const response = await axios.post(`${this.mastodonUrl}/oauth/token`, postParams)
    this.setStorage({ key: 'token', value: response.data.access_token })
    await this.fetchInstance()
    await this.fetchAccount()
  }

  private setStorage ({ key, value }: { key: string, value: string }) {
    this.localStorage.setItem(key, value)
    this.restoreFromStorage()
  }

  static REDIRECT_URI (): string {
    if (process.env.NODE_ENV === 'production') return `https://${process.env.REACT_APP_DOMAIN}`
    return `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/oauth_callback`
  }

  static pickName (account: AccountInfo): string {
    return account.display_name !== '' ? account.display_name : account.username
  }

  // 保存されたアカウント情報削除
  public clearStorage () {
    this.localStorage.clear()
    this.restoreFromStorage()
  }

  // アカウント情報取得
  async fetchAccount () {
    const response = await axios.get(`${this.mastodonUrl}/api/v1/accounts/verify_credentials`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    this.setStorage({ key: 'account', value: JSON.stringify(response.data) })
  }

  // サーバー情報取得
  async fetchInstance () {
    const response = await axios.get(`${this.mastodonUrl}/api/v1/instance`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    this.setStorage({ key: 'instance', value: JSON.stringify(response.data) })
  }
}
