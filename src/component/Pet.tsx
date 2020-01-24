import React, { useEffect } from 'react'
import Pet, { PetStatus } from '../lib/Pet'
import { useSelector } from 'react-redux'
import Account from '../lib/Account'
import Letter from '../lib/Letter'
import { FetchTypes } from './useFetchLetters'

const Component: React.FC = () => {
  const singletonSelector: any = useSelector((state: any) => state.singleton)
  const pet: Pet = singletonSelector.pet

  useEffect(() => {
    pet.init()
    // TODO: クリーンアップでinitされたものをすべて削除する（アバターなど）
  }, [])

  return (
    <div id="house">
      <div id="background"></div>
      <canvas id="hitTest">
        図形を表示するには、canvasタグをサポートしたブラウザが必要です。
      </canvas>
      <div id="door"></div>
      <div id="pet"></div>
      <div id="post"></div>
    </div>
  )
}

export default Component
