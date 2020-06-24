import React from 'react'
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'
import { getProfile } from '../../lib/api'
import { Avatar } from 'antd'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { PoundOutlined } from '@ant-design/icons'
import Button from '@material-ui/core/Button'

const profileStyleDesktop = { 
  color: 'white', 
  margin: '0 10px', 
  fontSize: '15px' 
}

const profileStyleMobile = {  
  margin: '0 10px', 
  fontSize: '15px'
}

const moneyStyleDesktop = {
  display: 'inline'
}

const moneyStyleMobile = {
  display: 'block',
  margin: '0 auto'
}



function NavbarRevised(props){
  
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = React.useState(null)
  const [menu, toggleMenu] = React.useState(false)
  const [windowSize, setSize] = React.useState(window.innerWidth)


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

  React.useEffect(()=> {
    function changeWidth(){
      setSize(window.innerWidth)
    }

    window.addEventListener('resize', changeWidth)
  })


  const handleLogout = () => {
    logout()
    history.push('')
    window.location.reload(true)
  }

  const handleClickAccount = () => {
    history.push('/settings')
    window.location.reload(true)
  }

  const handleClickDashboard = () => {
    history.push('/dashboard')
    window.location.reload(true)
  }

  const handleClickHome = () => {
    history.push('')
    window.location.reload(true)
  }

  const menuToggle = () => {
    toggleMenu(!menu)
  }


  return (
    <nav className="navbar is-dark theme-color-background" role="navigation" aria-label="main navigation" style={{ boxShadow: '0 0 2px black' }}>
      <div className="navbar-brand">
        <span className="watch-buttons">
          <img src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591804026/my_images/logo_utimcd.png' alt='logo' onClick={handleClickHome} style={{ padding: '5px' }} />
        </span>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={menuToggle}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${menu && windowSize < 1000  ? 'is-active' : ''}`}>
        <div className="navbar-start">
       
        </div>

        <div className="navbar-end">
          {isAuthenticated() && user ?
            <div style={{ marginRight: '25px', paddingTop: '5px' }} className= {menu ? 'centered' : ''}>
              <Tooltip style={ menu && windowSize < 1000 ? moneyStyleMobile : moneyStyleDesktop} title="These are your account funds. They can be used to invest in our properties. You will be creditted every month based on how much rental income your properties generate" arrow>
                <IconButton><p style={menu && windowSize < 1000  ? profileStyleMobile : profileStyleDesktop}>{user.money ? `£${user.money.toLocaleString()}` : ''}</p><PoundOutlined style={{ color: `${menu && windowSize < 1000 ? '' : 'white'}` }} /></IconButton>
              </Tooltip>
              <span className="navbar-item has-dropdown is-hoverable" style={{ display: 'inline' }}>
                <Avatar src={user.profile_image} />

                <span className="navbar-dropdown is-right">
                  <Link className='link' to='/dashboard' onClick={handleClickDashboard}>
                    <a className="navbar-item">
                    Profile
                    </a>
                  </Link>
                  <Link className='link' to='/settings' onClick={handleClickAccount}>
                    <a className="navbar-item">
                    My account
                    </a>
                  </Link>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" onClick={() =>{
                    handleLogout()
                  }}>Log out</a>
                </span>
              </span> </div> : <div className="navbar-item"><Link to='/login'><Button style={{ color: 'white' }}>Login</Button></Link> </div>
          }
        </div>
      </div>
    </nav>
  )

}

export default withRouter(NavbarRevised) 