import React from 'react'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import DashboardPage from '../dashboard/DashboardPage'
import PortfolioPage from '../portfolio/PortfolioPage'
import InvestmentPage from '../investments/InvestmentPage'
import NewsPage from '../news/NewsPage'
import AdvicePage from '../advice/AdvicePage'
import AdviceShowPage from '../advice/AdviceShowPage'
import SettingsPage from '../settings/SettingsPage'
import WatchlistPage from '../watchlist/WatchlistPage'
import PropertiesPage from '../properties/PropertiesPage'
import PropertyShowPage from '../singleProperty/PropertyShow'
import LeaderboardPage from '../leaderboard/LeaderboardPage'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import SidebarNavigation from './SidebarNavigation'

const sidebarDesktopStyle = {
  position: 'fixed',
  width: '100%'
}

const sidebarResponsiveStyle = {
  width: '100%'
}

const sidebarOpen = {
  height: '100vh'
}
const sidebarCollapsed = {
  height: '50px'
}

const mainSectionContainer = { 
  overflowY: 'scroll',
  overflowX: 'hidden', 
  height: '90vh', 
  position: 'relative', 
  width: '100%' 
}

//  Component seperates sidebar and main content when signed in - Sidebar remains static whilst router handles main section changes
function SignedInRouter (){
  const [menu, toggleMenu] = React.useState(false)
  const [windowSize, setSize] = React.useState(window.innerWidth)

  // Handles responsive changes
  React.useEffect(()=> {
    function changeWidth(){
      setSize(window.innerWidth)
    }

    window.addEventListener('resize', changeWidth)
  })

  const menuToggle = () => {
    toggleMenu(!menu)
  }


  return (
    <BrowserRouter>
      <div className="columns no-column-margin" style={windowSize > 768 ? sidebarDesktopStyle : sidebarResponsiveStyle}>

        {/* Sidebar section and responsive layout handling */}

        <div className="column side-bar is-one-fifth" style={menu || windowSize > 768 ? sidebarOpen : sidebarCollapsed}>
          {windowSize < 768 ? <div className='sidebar-toggle' onClick={menuToggle}><ArrowDropDownCircleIcon /></div> : '' }
          {menu || windowSize > 768 ? <SidebarNavigation /> : '' }
        </div>

        {/* Main Section and routing */}

        <div className="column is-four-fifths main-section  ">
          <div style={mainSectionContainer}>
            <Switch>
              <Route exact path='/dashboard' component={DashboardPage} />
              <Route exact path='/portfolio' component={PortfolioPage} />
              <Route exact path='/investments' component={InvestmentPage} />
              <Route exact path='/watchlist' component={WatchlistPage} />
              <Route exact path='/news' component={NewsPage} />
              <Route exact path='/advice' component={AdvicePage} />
              <Route exact path='/advice/:id' component={AdviceShowPage} />
              <Route exact path='/settings' component={SettingsPage } />
              <Route exact path='/properties' component={PropertiesPage} />
              <Route exact path='/property/:id' component={PropertyShowPage} />
              <Route exact path='/leaderboard' component={LeaderboardPage} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default withRouter(SignedInRouter)


