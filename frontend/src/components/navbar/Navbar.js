import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import MoreIcon from '@material-ui/icons/MoreVert'
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'
import { getProfile } from '../../lib/api'
import { Avatar } from 'antd'
import { PoundOutlined } from '@ant-design/icons'
import Tooltip from '@material-ui/core/Tooltip'


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}))


function Navbar() {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const [user, setUser] = React.useState(null)

  React.useEffect(()=> {
    console.log('CLICKED')
    if (isAuthenticated()){
      const getUser = async()=>{
        const res = await getProfile()
        console.log(res.data)
        setUser(res.data)
      }
      getUser()
    }
  },[location]) 


  const handleLogout = () => {
    logout()
    history.push('')
    window.location.reload(true)
  }



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }



  const handleMenuClose = () => {
    setAnchorEl(null)

  }

 

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to='/dashboard'> Profile</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to='/settings'>My account</Link></MenuItem>
      <MenuItem onClick={() =>{
        handleLogout()
        handleMenuClose()
      }}>Log out</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'


  return (
    <div  className='no-padding' style={{ position: 'relative', width: '100%' }}>
      <AppBar position="static" style={{ backgroundColor: 'rgb(30, 21, 73)' }} className='shadow' >
        <Toolbar>
          <Link to ='/'>
            <Typography className={classes.title} variant="h6" noWrap>
              <img src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591804026/my_images/logo_utimcd.png' alt='logo' />
            </Typography>
          </Link>
          {/* SEARCHBAR HERE */}
          
          <div className={classes.grow} />
          {isAuthenticated() && user ? (<div className={classes.sectionDesktop}>
            {/* INSERT MESSAGES AND NOTIFICATIONS BUTTONS HERE */}
            <Tooltip title="These are your account funds. They can be used to invest in our properties. You will be creditted every month based on how much rental income your properties generate" arrow>
              <IconButton><p style={{ color: 'white', margin: '0 10px', fontSize: '15px' }}>{user.money ? `£${user.money}` : ''}</p><PoundOutlined style={{ color: 'white' }} /></IconButton>
            </Tooltip>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={user.profile_image} />
            </IconButton>
          </div>) : <Link to='/login'><Button style={{ color: 'white' }}>Login</Button></Link> }
          
          {/* mobile styling section */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
}

export default withRouter(Navbar)




// ------ THESE ARE THE MESSAGES AND NOTIFICATIONS ICONS ------
// <IconButton aria-label="show 4 new mails" color="inherit">
//               <Badge badgeContent={4} color="secondary">
//                 <MailIcon />
//               </Badge>
//             </IconButton>
//             <IconButton aria-label="show 17 new notifications" color="inherit">
//               <Badge badgeContent={17} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>


//  ----- MENU BURGER -------
//  <IconButton
// edge="start"
// className={classes.menuButton}
// color="inherit"
// aria-label="open drawer"
// >
// <MenuIcon />
// </IconButton>



// ----- SEARCH BAR SECTION ----------
//  <div className={classes.search}>
// <div className={classes.searchIcon}>
//   <SearchIcon />
// </div>
// <InputBase
//   placeholder="Search…"
//   classes={{
//     root: classes.inputRoot,
//     input: classes.inputInput
//   }}
//   inputProps={{ 'aria-label': 'search' }}
// />
// </div> 

// const renderMobileMenu = (
//   <Menu
//     anchorEl={mobileMoreAnchorEl}
//     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//     id={mobileMenuId}
//     keepMounted
//     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//     open={isMobileMenuOpen}
//     onClose={handleMobileMenuClose}
//   >
//     <MenuItem>
//       <IconButton aria-label="show 4 new mails" color="inherit">
//         <Badge badgeContent={4} color="secondary">
//           <MailIcon />
//         </Badge>
//       </IconButton>
//       <p>Messages</p>
//     </MenuItem>
//     <MenuItem>
//       <IconButton aria-label="show 11 new notifications" color="inherit">
//         <Badge badgeContent={11} color="secondary">
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>
//       <p>Notifications</p>
//     </MenuItem>
//     <MenuItem onClick={handleProfileMenuOpen}>
//       <IconButton
//         aria-label="account of current user"
//         aria-controls="primary-search-account-menu"
//         aria-haspopup="true"
//         color="inherit"
//       >
//         <AccountCircle />
//       </IconButton>
//       <p>Profile</p>
//     </MenuItem>
//   </Menu>
// )

// const handleMobileMenuOpen = (event) => {
//   setMobileMoreAnchorEl(event.currentTarget)
// }

// const handleMobileMenuClose = () => {
//   setMobileMoreAnchorEl(null)
// }