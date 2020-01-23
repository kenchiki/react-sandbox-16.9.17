import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Account, { AccountInfo } from '../lib/Account'
import { TootInfo } from '../interface'
import useFetchLetters, { FetchTypes } from './useFetchLetters'

const SentLetters: React.FC = () => {
  const accountSelector: any = useSelector((state: any) => state.account)
  const isLogin: boolean = accountSelector.isLogin
  const letters: Array<TootInfo> = useFetchLetters(FetchTypes.Sent)

  const pickMessage = function (message: TootInfo): string {
    let content: string = message.last_status.content
    content = content.replace(/<span class="h-card">.+<\/span>/, '')
    content = content.replace(/<\/p><p>/, '\n\n')
    content = content.replace(/(<br>|<br \/>)/g, '\n')
    content = content.replace(/<.+?>/g, '')
    content = content.replace(/\n/g, '<br>')

    return content
  }

  const pickToNames = function (message: TootInfo): string {
    return message.accounts.reduce((saveVal: string, account: AccountInfo) => {
      const name = Account.pickName(account)
      return `${name}さんへ ${saveVal}`
    }, '')
  }

  const pickCreatedAt = function (message: TootInfo): string {
    const d = new Date(message.last_status.created_at)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }

  return (
    <div className="messages">
      {
        (() => {
          if (isLogin) {
            return (
              <div className="modal">
                <div className="modal__header">
                  送ったお手紙
                  <Link to="/">×</Link>
                </div>
                <div className="modal__in">
                  <div className="letters">
                    <ul className="letters__items">
                      {letters.map(letter => (
                        <li key={letter.id} className="letters__item">
                          <div className="letters__letter">
                            <p className="letters__message">{ pickToNames(letter) }</p>
                            <p className="letters__message">{ pickMessage(letter) }</p>
                            <p className="letters__friend">{ pickCreatedAt(letter) }</p>
                          </div>
                        </li>
                      ))}

                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        })()
      }
    </div>
  )
}

export default SentLetters
