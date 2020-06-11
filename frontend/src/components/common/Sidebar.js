import React from 'react'
import { Link, withRouter, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import { getProfile } from '../../lib/api'
import HomeIcon from '@material-ui/icons/Home'
import FolderSharedIcon from '@material-ui/icons/FolderShared'
import PieChartIcon from '@material-ui/icons/PieChart'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AppsIcon from '@material-ui/icons/Apps'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import SettingsIcon from '@material-ui/icons/Settings'

function Sidebar() {
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const location = useLocation()
  const [user, setUser] = React.useState(null)

  const locations = {
    dashboard: 0,
    portfolio: 1,
    investments: 2,
    watchlist: 3,
    properties: 4,
    advice: 5,
    news: 6,
    settings: 7
  }

  React.useEffect(()=> {
    setSelectedIndex(locations[location.pathname.substring(1)])
  }, [location])

  React.useEffect(async()=> {
    const res = await getProfile()
    setUser(res.data)
  }, [])

  return (
    <div className="column side-bar is-one-fifth">
      <div >
        <List component="nav" aria-label="main mailbox folders">
          <h5 className='subpage-title'>Welcome back, {user ? user.username : 'Friend'}</h5>
          <Link className='link' to='/dashboard'>
            <ListItem
              button
              selected={selectedIndex === 0}
              
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link className='link'  to='/portfolio'>
            <ListItem
              button
              selected={selectedIndex === 1}
             
            >
              <ListItemIcon>
                <FolderSharedIcon />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItem>
          </Link>
          <Link className='link'  to='/investments'>
            <ListItem
              button
              selected={selectedIndex === 2}
         
            >
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary="Investments" />
            </ListItem>
          </Link>
          <Link className='link'  to='/watchlist'>
            <ListItem
              button
              selected={selectedIndex === 3}
            
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="WatchList" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <h5 className='subpage-title'>The Marketplace</h5>
          <Link className='link'  to='/properties'>
            <ListItem
              button
              selected={selectedIndex === 4}
             
            >
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Properties" />
            </ListItem>
          </Link>
          <Link className='link'  to='/advice'>
            <ListItem
              button
              selected={selectedIndex === 5}
              
            >
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary="Investor Advice" />
            </ListItem>
          </Link>
          <Link className='link'  to='/news'>
            <ListItem
              button
              selected={selectedIndex === 6}
            >
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Property News" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <Link className='link'  to='/settings' >
            <ListItem
              button
              selected={selectedIndex === 7}
              
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  )
}

export default withRouter(Sidebar)