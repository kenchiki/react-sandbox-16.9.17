import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Nav: React.FC = () => {
  const account: any = useSelector((state: any) => state.account)
  const isLogin: boolean = account.isLogin

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {
          (() => {
            if (isLogin) {
              return (
                <>
                  <li>
                    <Link to="/sent_letters">送った手紙</Link>
                  </li>
                  <li>
                    <Link to="/received_letters">届いた手紙</Link>
                  </li>
                  <li>
                    <Link to="/logout">ログアウト</Link>
                  </li>
                </>
              )
            } else {
              return (
                <li>
                  <Link to="/login">ログイン</Link>
                </li>
              )
            }
          })()
        }
      </ul>
    </nav>
  )
}

export default Nav
