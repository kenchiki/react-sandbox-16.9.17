import React, { useEffect, useMemo} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Account from '../lib/Account'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions'

const OauthCallback: React.FC = () => {
  const search: string = useLocation().search
  // 一度だけ生成するためにキャッシュ
  const query = useMemo(() => new URLSearchParams(search), [search])
  const history = useHistory()
  const dispatch: any = useDispatch()
  const singletonSelector: any = useSelector((state: any) => state.singleton)
  const account: Account = singletonSelector.account

  const pickCode = (query: URLSearchParams): string => {
    return query.get('code')!
  }

  useEffect(() => {
    (async () => {
      console.log('OauthCallback done')
      try {
        await account.fetchToken(pickCode(query))
        dispatch(login())
        history.push('/')
      } catch (error) {
        // TODO: エラー処理
        alert('oauth error')
      }
    })()
  }, [dispatch, history, account, query])

  return (
    <div>
    </div>
  )
}

export default OauthCallback
