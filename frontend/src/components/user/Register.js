import React from 'react'
import Stepper from './Stepper'
import axios from 'axios'
import { registerUser } from '../../lib/api'


class Register extends React.Component {
state = {
  formData: {
    'username': null,
    'email': null,
    'profile_image': 'https://res.cloudinary.com/dy7eycl8m/image/upload/v1591819721/empty-avatar-png-transparent_mighcw.png',
    'bio': null,
    'first_name': null,
    'last_name': null,
    'password': null,
    'password_confirmation': null,
    'experience': null
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
    const res = await registerUser(this.state.formData)
    this.props.history.push('/login')
    console.log(res)
  } catch (err){
    console.log(err)
    
  }
}

render(){
  return (
    <>
      <div className='columns main-section'>
        <div className='column is-half is-offset-one-quarter clear-background shadow' style={{ height: '500px', marginTop: '5%' }}>
          <Stepper onChange={this.handleChange} {...this.state.formData} handleSubmit={this.handleSubmit} />
        </div>
      </div>
      
    </>
  )
}
}

export default Register