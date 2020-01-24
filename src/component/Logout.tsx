import React from 'react'
import { useHistory } from 'react-router-dom'
import Account from '../lib/Account'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions'

const Logout: React.FC = () => {
  const history = useHistory()
  const dispatch: any = useDispatch()
  const singletonSelector: any = useSelector((state: any) => state.singleton)
  const account: Account = singletonSelector.account

  ;(async () => {
    await account.clearStorage()
    dispatch(logout())
    history.push('/')
  })()

  return (
    <div>
    </div>
  )
}

export default Logout
