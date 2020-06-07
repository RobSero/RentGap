import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import Register from './components/user/Register'
import DashboardPage from './components/dashboard/DashboardPage'
import PortfolioPage from './components/portfolio/PortfolioPage'
import InvestmentPage from './components/investments/InvestmentPage'
import NewsPage from './components/news/NewsPage'
import AdvicePage from './components/advice/AdvicePage'
import SettingsPage from './components/settings/SettingsPage'
import WatchlistPage from './components/watchlist/WatchlistPage'
import PropertiesPage from './components/properties/PropertiesPage'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/dashboard' component={DashboardPage} />
        <Route exact path='/portfolio' component={PortfolioPage} />
        <Route exact path='/investments' component={InvestmentPage} />
        <Route exact path='/watchlist' component={WatchlistPage} />
        <Route exact path='/news' component={NewsPage} />
        <Route exact path='/advice' component={AdvicePage} />
        <Route exact path='/settings' component={SettingsPage} />
        <Route exact path='/properties' component={PropertiesPage} />
      </Switch>
    </BrowserRouter>
  )
}
export default App


