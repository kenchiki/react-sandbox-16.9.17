import React from 'react'
import './App.css'
import About from './component/About'
import Menu from './component/Menu'
import {
  Switch,
  Route, BrowserRouter as Router,
} from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
