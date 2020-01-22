import React from 'react'
import 'bootstrap'
import './stylesheets/application.scss'
import Pet from './component/Pet'
import About from './component/About'
import Nav from './component/Nav'
import Login from './component/Login'
import Logout from './component/Logout'
import OauthCallback from './component/OauthCallback'
import ReceivedLetters from './component/ReceivedLetters'
import SentLetters from './component/SentLetters'

import {
  Switch,
  Route, BrowserRouter as Router
} from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div id="app">
      <Router>
        <div id="wrapper">
          <div id="container-row">
            <h1 id="header-logo">銀河ペット ver.1.0</h1>
            <div id="container-col">
              <header id="header">
                <Nav />
              </header>
              <div id="content">
                <div v-if="isLogin()">
                  <Pet />
                </div>
              </div>
            </div>
            <p id="footer-status"></p>
          </div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/oauth_callback">
              <OauthCallback />
            </Route>
            <Route path="/received_letters">
              <ReceivedLetters />
            </Route>
            <Route path="/sent_letters">
              <SentLetters />
            </Route>
            <Route path="/">
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
