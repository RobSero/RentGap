import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    color: 'white'
    // backgroundColor: theme.palette.background.paper
  }
}))



function Sidebar() {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <div className="column side-bar is-one-fifth">
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <h5 className='centered'>---USERNAME HERE---</h5>
          <Link to='/dashboard'>
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to='/portfolio'>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItem>
          </Link>
          <Link to='/investments'>
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Investments" />
            </ListItem>
          </Link>
          <Link to='/watchlist'>
            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="WatchList" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <h5 className='centered'>--- MARKETPLACE ---</h5>
          <Link to='/properties'>
            <ListItem
              button
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Properties" />
            </ListItem>
          </Link>
          <Link to='/advice'>
            <ListItem
              button
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Investor Advice" />
            </ListItem>
          </Link>
          <Link to='/news'>
            <ListItem
              button
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Property News" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <Link to='/settings' onClick={(event) => handleListItemClick(event, 7)}>
            <ListItem
              button
              selected={selectedIndex === 7}
              
            >
              <ListItemIcon>
                <InboxIcon />
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