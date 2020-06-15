import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import Register from './components/user/Register'
import LoginPage from './components/user/LoginPage'
import SignedInRouter from './components/common/SignedInRouter'
import NotFound from './components/common/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/dashboard' component={SignedInRouter} />
        <Route exact path='/portfolio' component={SignedInRouter} />
        <Route exact path='/investments' component={SignedInRouter} />
        <Route exact path='/watchlist' component={SignedInRouter} />
        <Route exact path='/news' component={SignedInRouter} />
        <Route exact path='/advice' component={SignedInRouter} />
        <Route exact path='/advice/:id' component={SignedInRouter} />
        <Route exact path='/settings' component={SignedInRouter} />
        <Route exact path='/properties' component={SignedInRouter} />
        <Route exact path='/property/:id' component={SignedInRouter} />
        <Route exact path='/leaderboard' component={SignedInRouter} />
        <Route exact path='/*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
export default App


