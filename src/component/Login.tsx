import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Account from '../lib/Account'
import { useSelector } from 'react-redux'

const Login: React.FC = () => {
  const [state, setState] = useState({ url: process.env.REACT_APP_MASTODON_ORIGIN } as { url: string })
  const singletonSelector: any = useSelector((state: any) => state.singleton)
  const account: Account = singletonSelector.account

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ url: e.target.value })
  }

  const login = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      await account.login(state.url)
    } catch (error) {
      // TODO: エラー処理
      alert('login error')
    }
  }

  return (
    <div className="login">
      <div className="modal">
        <div className="modal__header">ログイン
          <Link to="/">×</Link>
        </div>
        <div className="modal__in">
          <div className="form-group mt-0">
            <label htmlFor="mastodon_url" className="col-form-label">マストドンのURLを入力してログインしてね:</label>
            <input type="text" className="form-control" id="mastodon_url" onChange={changeUrl} value={state.url} placeholder="https://gingadon.com" />
          </div>
          <div className="form-group">
            <input type="button" value="ログイン" onClick={login} className="form-control btn btn-danger" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
