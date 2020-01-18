import React from 'react'
import { Link } from 'react-router-dom'

const template = (props: { }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}

const Menu = React.memo(template)

export default Menu
