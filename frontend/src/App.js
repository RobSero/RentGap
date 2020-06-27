import React from 'react'
import ReactGA from 'react-ga'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import NavbarRevised from './components/navbar/NavbarRevised'
import Register from './components/user/Register'
import LoginPage from './components/user/LoginPage'
import SignedInRouter from './components/common/SignedInRouter'
import NotFound from './components/common/NotFound'

// All pages to be redirected to SignedInRouter with exception of Home, Register & Login Pages
const App = () => {

  React.useEffect(() => {
    ReactGA.initialize('UA-171026512-1')
    //  Report page view
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])


  return (
    <BrowserRouter>
      <NavbarRevised />
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


