import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import Register from './components/user/Register'
import SignedInRouter from './components/common/SignedInRouter'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/*' component={SignedInRouter} />
      </Switch>
    </BrowserRouter>
  )
}
export default App


