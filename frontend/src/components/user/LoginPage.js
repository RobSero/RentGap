import React from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { setToken } from '../../lib/auth'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { Alert } from 'antd'


class LoginPage extends React.Component {
state = {
  formData: {
    'email': '',
    'password': ''
  },
  error: {}
}

// HANDLE USERS INPUTS - KEEPS COMPONENTS CONTROLLED
handleChange = ({ target }) => {
  const inputValue = target.value
  this.setState({
    formData: {
      ...this.state.formData,
      [target.name]: inputValue
    }
  })
}

// SUBMIT DETAILS TO THE BACKEND FOR VALIDATION - WILL RETURN ERRORS AND SAVE TO STATE SO INPUTS CAN NOTIFY USER
handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await axios.post('/api/auth/login/', { ...this.state.formData })
    // SAVE TOKEN TO LOCAL STORAGE
    setToken(res.data.token)
    this.openNotification(res.data.username)
    // SMALL DELAY SO IT FEELS MORE NATURAL
    setTimeout(()=> {
      this.props.history.push('/dashboard')
    }, 500)
  } catch (err){
    // SET ERRORS TO STATE IF REQUIRED
    this.setState({
      error: {
        ...err.response.data
      }
    })
  }
}

// WELCOME NOTIFICATION
openNotification = (user) => {
  notification.open({
    message: `Hey ${user}, Have a good day for investing!`,
    description:
      'Check in on our property options or analyze your investments',
    icon: <SmileOutlined style={{ color: '#108ee9' }} />
  })
}


render(){
  const { formData } = this.state
  return (
    <>
      {/* ALERT USER IF WRONG CREDENTIALS */}
      {'detail' in this.state.error ? <div className='sub-section'><Alert  message='Invalid Credentials, please try again' type="error" closeText="Close Now" style={{ margin: '5px 30px' }} /></div>  : '' }
      <div className='columns main-section'>
        
        <div className='column is-half is-offset-one-quarter clear-background centered shadow' style={{ height: '300px', marginTop: '5%' }}>
          <h1 style={{ marginTop: '10px' }}>Welcome Back</h1>
          <p>Sign In</p>
          {/* FORM SECTION */}
          <div style={{  width: '60%', margin: '0 auto' }}>
            <form  onSubmit={this.handleSubmit} Validate autoComplete="off" style={{ width: '100%', padding: '0 60px' }}>
              <div className='centered' style={{ margin: '0 auto' }}>
                {'email' in this.state.error ? <TextField  id="standard-error" error helperText={this.state.error.email}  label="Email" name='email' onChange={this.handleChange} value={formData.email} style={{ width: '100%' }} /> : <TextField  id="standard-error" label="Email" name='email' onChange={this.handleChange} value={formData.email} style={{ width: '100%' }} />
                }
                
                <br />
                {'password' in this.state.error ? <TextField  id="standard-error" error helperText={this.state.error.password}  label="Email" name='password' onChange={this.handleChange} value={formData.password} style={{ width: '100%' }} /> : <TextField  id="standard-error" label="Password" name='password' type='password' onChange={this.handleChange} value={formData.password} style={{ width: '100%' }} />
                }
           
              </div>
              {/* REDIRECT LINK TO REGISTER */}
              <Link to='/register'>
                <p style={{ marginTop: '5px' }}>Not got an account? Sign Up Here!</p>
              </Link>
              <Button
                variant="contained"
                color="primary"
                
                onClick={this.handleSubmit}
                style={{ marginTop: '10px' }}
              >
                Sign In
              </Button>
              <input type='submit' style={{ display: 'none' }}></input>
            </form>
          </div>
         
         
         
        </div>
      </div>
      
    </>
  )
}
}

export default LoginPage