import React from 'react'
import { Link } from 'react-router-dom'

const Component: React.FC = () => {
  return (
    <div className="about">
      <div className="modal">
        <div className="modal__header">説明書
          <Link to="/">×</Link>
        </div>
        <div className="modal__in">
          <p>マストドンのお友達からお手紙を書いたり、もらったりできるアプリです。</p>
        </div>
      </div>
    </div>
  )
}

export default Component
