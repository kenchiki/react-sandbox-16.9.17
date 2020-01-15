import React, { useState } from 'react'
import TodoList from './TodoList'
import './App.css'
import { Item, State } from './interface'

const App: React.FC = () => {
  const [state, setState] = useState({ items: [], text: '' } as State)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!state.text.length) {
      return
    }
    const newItem: Item = {
      text: state.text,
      id: Date.now()
    }
    setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ items: state.items, text: e.target.value })
  }

  return (
    <div>
      <h3>TODO</h3>
      <TodoList items={state.items} />
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
          Add #{state.items.length + 1}
        </button>
      </form>
    </div>
  )
}

export default App
