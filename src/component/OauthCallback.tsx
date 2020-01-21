import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Account from '../lib/Account'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions'

const OauthCallback: React.FC = () => {
  const query = new URLSearchParams(useLocation().search)
  const history = useHistory()
  const dispatch: any = useDispatch()

  const getCode = (): string => {
    return query.get('code')!
  }

  ;(async () => {
    try {
      const account = new Account()
      await account.fetchToken(getCode())
      dispatch(login())
      history.push('/')
    } catch (error) {
      // TODO: エラー処理
      alert('エラー')
    }
  })()

  return (
    <div>
    </div>
  )
}

export default OauthCallback
