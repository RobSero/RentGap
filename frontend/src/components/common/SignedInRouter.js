import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import DashboardPage from '../dashboard/DashboardPage'
import PortfolioPage from '../portfolio/PortfolioPage'
import InvestmentPage from '../investments/InvestmentPage'
import NewsPage from '../news/NewsPage'
import AdvicePage from '../advice/AdvicePage'
import SettingsPage from '../settings/SettingsPage'
import WatchlistPage from '../watchlist/WatchlistPage'
import PropertiesPage from '../properties/PropertiesPage'
import PropertyShowPage from '../singleProperty/PropertyShow'

const SignedInRouter = () => {
  return (
    <BrowserRouter>
      <div className="columns no-column-margin" style={{ position: 'fixed', width: '100% ' }}>
        <Sidebar />
        <div className="column is-four-fifths main-section  ">
          <Switch>
            <Route exact path='/dashboard' component={DashboardPage} />
            <Route exact path='/portfolio' component={PortfolioPage} />
            <Route exact path='/investments' component={InvestmentPage} />
            <Route exact path='/watchlist' component={WatchlistPage} />
            <Route exact path='/news' component={NewsPage} />
            <Route exact path='/advice' component={AdvicePage} />
            <Route exact path='/settings' component={SettingsPage} />
            <Route exact path='/properties' component={PropertiesPage} />
            <Route exact path='/property/:id' component={PropertyShowPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default SignedInRouter


