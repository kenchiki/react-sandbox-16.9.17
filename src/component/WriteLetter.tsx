import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Account, { AccountInfo } from '../lib/Account'
import Letter from '../lib/Letter'
import Friend from '../lib/Friend'

const Component: React.FC = () => {
  const [to, setTo] = useState('')
  const [body, setBody] = useState('')
  const [follows, setFollows] = useState([] as Array<AccountInfo>)
  const history = useHistory()

  const changeTo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTo(e.target.value)
  }

  const changeBody = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setBody(e.target.value)
  }

  const pickToLabel = (follow: AccountInfo): string => {
    const name = Account.pickName(follow)
    const url = new URL(follow.url)
    return `${name}<@${follow.username}@${url.host}>`
  }

  const pickTo = (toLabel: string): string => {
    const to: Array<string> | null = toLabel.match(/<@([^@]+)@([^@]+)>/)
    if (to === null) return ''

    const account = new Account()
    const accountInfo: AccountInfo = account.info!
    const accountHost = new URL(accountInfo.url).host
    // 同じサーバーの人はドメインがいらないので分岐
    return accountHost === to[2] ? `@${to[1]}` : `@${to[1]}@${to[2]}`
  }

  const send = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      // TODO: 入力チェック
      const account = new Account()
      const letter = new Letter(account)
      await letter.send(pickTo(to), body)
      history.push('/')
    } catch (error) {
      // TODO: エラー処理
      alert('エラー')
    }
  }

  useEffect(() => {
    (async () => {
      const account = new Account()
      const friend = new Friend(account)
      await friend.fetchFollows()
      setFollows(friend.follows)
    })()
  }, [])

  return (
    <div className="login">
      <div className="modal">
        <div className="modal__header">お手紙をかく
          <Link to="/">×</Link>
        </div>
        <div className="modal__in">
          <div className="form-group mt-0">
            <label htmlFor="to" className="col-form-label">宛先:</label>
            <input type="text" onChange={changeTo} value={to} className="form-control" id="to" autoComplete="on" list="friends" />
            <datalist id="friends">
              {follows.map(follow => (
                <option key={follow.id} value={pickToLabel(follow)} />
              ))}
            </datalist>
          </div>

          <div className="form-group mt-0">
            <label htmlFor="body" className="col-form-label">お手紙の内容:</label>
            <textarea onChange={changeBody} value={body} className="form-control" id="body" rows={5} />
          </div>

          <div className="form-group">
            <input type="button" value="送る" onClick={send} className="form-control btn btn-danger" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Component
