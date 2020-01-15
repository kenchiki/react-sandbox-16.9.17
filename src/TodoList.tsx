import React from 'react'
import { Item } from './interface'

const template = (props: { items: Array<Item> }) => {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  )
}

const TodoList = React.memo(template)
export default TodoList
