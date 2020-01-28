import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../../src/App'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Account from '../../src/lib/Account'
import Pet from '../../src/lib/Pet'

describe('ルートURLにアクセスした場合', () => {
  it('アプリタイトルが表示されること', () => {
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

    const store = mockStore(initialState)
    const { getByText } = render(<Provider store={store}><App /></Provider>)
    const linkElement = getByText(/銀河ペット/i)
    expect(linkElement).toBeInTheDocument()
  })
})
