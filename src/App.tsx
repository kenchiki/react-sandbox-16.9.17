import React, { useState } from 'react'
import TodoList from './TodoList'
import './App.css'
import { Item, State } from './interface'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from './redux/actions'

const App: React.FC = () => {
  const [state, setState] = useState({ text: '' } as State)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!state.text.length) {
      return
    }
    dispatch(addTodo(state.text))
    setState(state => ({
      text: ''
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ text: e.target.value })
  }

  const todosSelector = (state: any) => state.todos
  const todos: any = useSelector(todosSelector)
  const items: Array<Item> = todos.items

  return (
    <div>
      <h3>TODO</h3>
      <TodoList items={items} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">
          What needs to be done?
        </label>
        <input
          id="new-todo"
          onChange={handleChange}
          value={state.text}
        />
        <button>
          Add #{items.length + 1}
        </button>
      </form>
    </div>
  )
}

export default App
