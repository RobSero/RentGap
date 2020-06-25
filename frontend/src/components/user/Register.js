import React from 'react'
import Stepper from './Stepper'
import { Alert } from 'antd'
import { registerUser } from '../../lib/api'


class Register extends React.Component {
state = {
  formData: {
    'username': '',
    'email': '',
    'profile_image': 'https://res.cloudinary.com/dy7eycl8m/image/upload/v1591819721/empty-avatar-png-transparent_mighcw.png',
    'bio': '',
    'first_name': '',
    'last_name': '',
    'password': '',
    'password_confirmation': '',
    'experience': ''
  },
  error: {}
}

// HANDLES USER INPUT - KEEPS COMPONENTS CONTROLLED
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

// HANDLE SUBMISSION OF FORM - IF ERRORS, WILL SAVE THEM TO STATE SO COMPONENTS CAN FLAG THEM AS ISSUES TO USER
// UPON SUCCESS, REDIRECTS USER TO LOGIN PAGE
handleSubmit = async () => {
  try {
    await registerUser(this.state.formData)
    this.props.history.push('/login')
  } catch (err){
    // SET ERRORS TO STATE
    this.setState({
      error: {
        ...err.response.data
      }
    })
    
  }
}

render(){
  return (
    <>
      {/* ALERTS USER OF ERRORS */}
      {'message' in this.state.error ? <div className='sub-section'><Alert  message={this.state.error.message[0]} type="error" closeText="Close Now" style={{ margin: '5px 30px' }} /></div>  : '' }
      {/* ALERTS USER OF INVALID INPUTS */}
      {'first_name' in this.state.error || 'last_name' in this.state.error || 'email' in this.state.error || 'username' in this.state.error ? <div className='sub-section'><Alert  message='Invalid Registration, please check alerts on your information' type="error" closeText="Close Now" style={{ margin: '5px 30px' }} /></div>  : '' }
      <div className='columns main-section'>
        
        <div className='column is-half is-offset-one-quarter clear-background shadow' style={{ height: '500px', marginTop: '5%' }}>
          {/* STEPPER CONTAINS ALL FORM ONPUTS */}
          <Stepper onChange={this.handleChange} {...this.state.formData} handleSubmit={this.handleSubmit} errors={this.state.error} />
        </div>
      </div>
      
    </>
  )
}
}

export default Register