import React from 'react'
import { useHistory } from 'react-router-dom'
import Account from '../lib/Account'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions'

const Logout: React.FC = () => {
  const history = useHistory()
  const dispatch: any = useDispatch()

  ;(async () => {
    const account = new Account()
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
