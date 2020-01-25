import { useEffect, useState } from 'react'
import Account from '../lib/Account'
import Letter, { TootInfo } from '../lib/Letter'
import { useSelector } from 'react-redux'

export enum FetchTypes {
  Sent, Received
}

const useFetchLetters = (type: FetchTypes): Array<TootInfo> => {
  const [state, setState] = useState({ letters: [] } as { letters: Array<TootInfo> })
  const singletonSelector: any = useSelector((state: any) => state.singleton)
  const account: Account = singletonSelector.account

  useEffect(() => {
    (async () => {
      const letter = new Letter(account)
      await letter.fetchLetters()
      const letters = type === FetchTypes.Received ? letter.receivedLetters() : letter.sentLetters()
      setState({ letters: letters })
    })()
  }, [account, type])

  return state.letters
}

export default useFetchLetters
