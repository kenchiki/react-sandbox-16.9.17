import React, { useEffect } from 'react'
import Pet, { PetStatus } from '../lib/Pet'
import { useDispatch, useSelector } from 'react-redux'
import Account from '../lib/Account'
import { resetPet } from '../redux/actions'

const Component: React.FC = () => {
  const singletonSelector: any = useSelector((state: any) => state.singleton)
  const pet: Pet = singletonSelector.pet
  const account: Account = singletonSelector.account

  const dispatch: any = useDispatch()

  useEffect(() => {
    pet.init()
    // TODO: クリーンアップでinitされたものをすべて削除する（アバターなど）
    return () => {
      pet.destroy()
      dispatch(resetPet(account))
    }
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
