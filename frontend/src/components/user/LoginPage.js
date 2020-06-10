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
      <div className='columns pink'>
        <div className='column is-half is-offset-one-quarter red '>
          <form  Validate autoComplete="off" style={{ width: '50%' }}>
            <div>
              <TextField fullWidth id="standard-error" label="Email" name='email' onChange={this.handleChange} value={formData.email} />
              <br />
              <TextField fullWidth id="standard-error" label="Password" name='password' onChange={this.handleChange} value={formData.password} />
           
            </div>
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
                Sign In
          </Button>
          <Link to='/register'>
            <p>Not got an account? Sign Up Here!</p>
          </Link>
        </div>
      </div>
      
    </>
  )
}
}

export default LoginPage