import { useEffect, useState } from 'react'
import Account from '../lib/Account'
import Letter from '../lib/Letter'
import { TootInfo } from '../interface'

export enum FetchTypes {
  Sent, Received
}

const useFetchLetters = (type: FetchTypes): Array<TootInfo> => {
  const [state, setState] = useState({ letters: [] } as { letters: Array<TootInfo> })

  useEffect(() => {
    (async () => {
      const account = new Account()
      const letter = new Letter(account)
      await letter.fetchLetters()
      const letters = type === FetchTypes.Received ? letter.receivedLetters() : letter.sentLetters()
      setState({ letters: letters })
    })()
  }, [type])

  return state.letters
}

export default useFetchLetters
