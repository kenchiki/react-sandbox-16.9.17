import React, { useEffect, useCallback } from 'react'
import Pet from '../lib/Pet'
import { useDispatch, useSelector } from 'react-redux'
import Account from '../lib/Account'
import { resetPet, setMessage } from '../redux/actions'

const Component: React.FC = () => {
  const singletonSelector: any = useSelector((state: any) => state.singleton)
  const pet: Pet = singletonSelector.pet
  const account: Account = singletonSelector.account

  const dispatch: Function = useDispatch()

  // 関数がなんども生成されないようにキャッシュ化する
  const passSetMessage = useCallback(
    (message: string): void => {
      dispatch(setMessage(message))
    },
    [dispatch]
  )

  // 更新されない第二引数を渡して一度だけ実行
  useEffect(() => {
    pet.passSetMessage(passSetMessage)
    pet.init()
    console.log('pet init')
    // TODO: クリーンアップでinitされたものをすべて削除する（アバターなど）
    return () => {
      pet.destroy()
      dispatch(resetPet(account))
    }
  }, [account, pet, passSetMessage, dispatch])

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
