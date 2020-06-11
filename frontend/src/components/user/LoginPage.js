import React from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { setToken } from '../../lib/auth'



class LoginPage extends React.Component {
state = {
  formData: {
    'email': '',
    'password': ''
  }
}

handleChange = ({ target }) => {
  const inputValue = target.value
  console.log(`${target.name} : ${inputValue}`)
  
  this.setState({
    formData: {
      ...this.state.formData,
      [target.name]: inputValue
    }
  })
}

handleSubmit = async () => {
  try {
    const res = await axios.post('/api/auth/login/', { ...this.state.formData })
    setToken(res.data.token)
    setTimeout(()=> {
      this.props.history.push('/dashboard')
    }, 500)
    
    console.log(res)
  } catch (err){
    console.log(err)
    
  }
}
render(){
  
  const { formData } = this.state
  return (
    
    <>
      <div className='columns main-section'>
        <div className='column is-half is-offset-one-quarter clear-background centered shadow' style={{ height: '300px', marginTop: '5%' }}>
          <h1 style={{ marginTop: '10px' }}>Welcome Back</h1>
          <p>Sign In</p>
          <div style={{  width: '60%', margin: '0 auto' }}>
            <form  Validate autoComplete="off" style={{ width: '100%', padding: '0 60px' }}>
              <div className='centered' style={{ margin: '0 auto' }}>
                <TextField  id="standard-error" label="Email" name='email' onChange={this.handleChange} value={formData.email} style={{ width: '100%' }} />
                <br />
                <TextField fullWidth id="standard-error" label="Password" name='password' onChange={this.handleChange} value={formData.password} />
           
              </div>
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
            </form>
          </div>
         
         
         
        </div>
      </div>
      
    </>
  )
}
}

export default LoginPage