import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getProfile, getOrders } from '../../lib/api'
import HomeIcon from '@material-ui/icons/Home'
import FolderSharedIcon from '@material-ui/icons/FolderShared'
import PieChartIcon from '@material-ui/icons/PieChart'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AppsIcon from '@material-ui/icons/Apps'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import SettingsIcon from '@material-ui/icons/Settings'
import Tooltip from '@material-ui/core/Tooltip'
import StorageIcon from '@material-ui/icons/Storage'
import NoPropertyNotify from './NoPropertyNotify'


const menuLabelStyle = {
  margin: '1em'
}

const iconStyle = {
  height: '20px',
  width: '20px',
  fill: 'white',
  marginRight: '15px',
  marginLeft: '10%'
}

const locations = {
  dashboard: 0,
  portfolio: 1,
  investments: 2,
  watchlist: 3,
  properties: 4,
  advice: 5,
  news: 6,
  leaderboard: 7,
  settings: 8
}




function SidebarNavigation() {
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const location = useLocation()
  const [user, setUser] = React.useState(null)
  const [orders, setOrders] = React.useState(null)

  React.useEffect(()=> {
    setSelectedIndex(locations[location.pathname.substring(1)])
  }, [location])

  React.useEffect(()=> {
    
    const updateSideBar = async () => {
      const res = await getProfile()
      const resOrders = await getOrders()
      setUser(res.data)
      setOrders(resOrders.data.length)
    }
    updateSideBar()
  }, [])



  return (
    
    <aside className="menu" style={{ overflow: 'scroll' }} >
      <p className="menu-label" style={menuLabelStyle}>
        Welcome, {user ? user.username : 'Friend'}
        
      </p>
      <ul className="menu-list">
        <li><Link className={selectedIndex === 0 ? 'is-active' : ''}  to='/dashboard'><HomeIcon style={iconStyle} /> Home</Link></li>
        <li><Tooltip title="Review your current property investments" arrow><Link className={selectedIndex === 1 ? 'is-active' : ''}  to='/portfolio'><FolderSharedIcon style={iconStyle} />Portfolio ({orders})</Link></Tooltip></li>
        <li><Tooltip title="Use analytics to predict your next move" arrow><Link className={selectedIndex === 2 ? 'is-active' : ''}  to='/investments'><PieChartIcon  style={iconStyle}/>Analysis</Link></Tooltip></li>
        <li><Tooltip title="Track properites before investing" arrow><Link className={selectedIndex === 3 ? 'is-active' : ''}  to='/watchlist'><FavoriteIcon style={iconStyle} />WatchList</Link></Tooltip></li>
      </ul>
      <p className="menu-label" style={menuLabelStyle}>
    The Marketplace
      </p>
      <ul className="menu-list">
        <li><Tooltip title="View all available properties we have on offer" arrow><Link className={selectedIndex === 4 ? 'is-active' : ''}  to='/properties'><AppsIcon style={iconStyle} />Properties<span>{orders ? '' : <NoPropertyNotify /> }</span></Link></Tooltip></li>
        <li><Tooltip title="Learn about the market and strategies" arrow><Link className={selectedIndex === 5 ? 'is-active' : ''}  to='/advice'><LiveHelpIcon style={iconStyle}/>Investor Advice</Link></Tooltip></li>
        <li><Tooltip title="Keep up to date with news and events" arrow><Link className={selectedIndex === 6 ? 'is-active' : ''}  to='/news'><ImportContactsIcon style={iconStyle}/>Property News</Link></Tooltip></li>
        <li><Tooltip title="Keep up to date with news and events" arrow><Link className={selectedIndex === 7 ? 'is-active' : ''}  to='/leaderboard'><StorageIcon style={iconStyle}/>Leaderboards</Link></Tooltip></li>
      </ul>
      <p className="menu-label" style={menuLabelStyle}>
    Settings
      </p>
      <ul className="menu-list">
        <li><Tooltip title="Update your account details" arrow><Link className={selectedIndex === 8 ? 'is-active' : ''}  to='/settings'><SettingsIcon style={iconStyle} />Account Settings</Link></Tooltip></li>
      </ul>
    </aside>
    
  )
}


export default SidebarNavigation