import React, {useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Account from '../lib/Account'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions'

const OauthCallback: React.FC = () => {
  const query = new URLSearchParams(useLocation().search)
  const history = useHistory()
  const dispatch: any = useDispatch()
  const singletonSelector: any = useSelector((state: any) => state.singleton)
  const account: Account = singletonSelector.account

  const pickCode = (query: URLSearchParams): string => {
    return query.get('code')!
  }

  useEffect(() => {
    (async () => {
      try {
        await account.fetchToken(pickCode(query))
        dispatch(login())
        history.push('/')
      } catch (error) {
        // TODO: エラー処理
        alert('oauth error')
      }
    })()
  }, [])

  return (
    <div>
    </div>
  )
}

export default OauthCallback
