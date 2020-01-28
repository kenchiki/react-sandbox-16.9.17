import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../../src/App'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Account from '../../src/lib/Account'
import Pet from '../../src/lib/Pet'

import userEvent from '@testing-library/user-event'

import axios from 'axios'
import qs from 'qs'

jest.mock('axios')

const getStore = () => {
  const account: Account = new Account()
  const pet: Pet = new Pet(account)

  const initialState = {
    account: {
      isLogin: false
    },
    singleton: {
      account: account,
      pet: pet
    },
    message: {
      message: '　'
    }
  }
  const mockStore = configureStore()
  return mockStore(initialState)
}

describe('サイドナビのログインを押下した場合', () => {
  it('ログイン画面が表示されること', () => {
    const { getByText, container } = render(<Provider store={getStore()}><App /></Provider>)

    // ログインを促すメッセージ表示
    const loginBtn: Element = container.querySelector("a[href='/login']")!
    fireEvent.click(loginBtn)
    expect(getByText(/マストドンのURLを入力してログインしてね/i)).toBeInTheDocument()
  })
})

describe('ログインフォームにマストドンURL入力後、ログインを押下した場合', () => {
  it('マストドンに接続できた場合、リダイレクトされること', async () => {
    const mastodonUrl = 'http://example.com'
    const { container } = render(<Provider store={getStore()}><App /></Provider>)
    fireEvent.click(container.querySelector("a[href='/login']")!)
    userEvent.type(container.querySelector('#mastodon_url')!, mastodonUrl)

    // typeof axiosはfunction
    const axiosMock = axios as jest.Mocked<typeof axios>
    axiosMock.post.mockResolvedValueOnce({
      data: { client_id: 'dummy', client_secret: 'dummy' }
    })

    // Jestではwindow.location.hrefはreadonlyのため、window.location.hrefに値を入れられるようにする
    delete window.location
    Object.defineProperty(window, 'location', {
      value: {
        href: ''
      },
      writable: true
    })

    // リダクレクトされるURLを作成
    const getParams = {
      response_type: 'code',
      client_id: 'dummy',
      redirect_uri: Account.REDIRECT_URI(),
      scope: Account.API_SCOPE
    }
    const authUrl = new URL(`${mastodonUrl}/oauth/authorize`)
    authUrl.search = qs.stringify(getParams)

    fireEvent.click(container.querySelector("input[value='ログイン']")!)
    await wait(() => {
      expect(window.location.href).toBe(authUrl.href)
    })
  })

  it('マストドンに接続できない場合、エラーダイアログが表示されること', async () => {
    const { container } = render(<Provider store={getStore()}><App /></Provider>)
    fireEvent.click(container.querySelector("a[href='/login']")!)
    userEvent.type(container.querySelector('#mastodon_url')!, 'http://example.com')

    window.alert = jest.fn()
    fireEvent.click(container.querySelector("input[value='ログイン']")!)
    await wait(() => {
      expect(window.alert).toHaveBeenCalledWith('login error')
    })
  })
})
