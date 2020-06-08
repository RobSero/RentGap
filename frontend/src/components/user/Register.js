import React from 'react'
import Stepper from './Stepper'
import axios from 'axios'


class Register extends React.Component {
state = {
  formData: {
    'username': 'Robbo',
    'email': 'robbo@email.com',
    'profile_image': 'https://ga-core.s3.amazonaws.com/production/uploads/instructor/image/14618/thumb_Screen_Shot_2019-05-30_at_16.42.14.png',
    'bio': 'Software Engineering Instructor in LDN',
    'first_name': 'Rob',
    'last_name': 'Sero',
    'password': 'pass',
    'password_confirmation': 'pass',
    'experience': 'mid'
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
    const res = await axios.post('/api/auth/register/', { ...this.state.formData })
    this.props.history.push('/login')
    console.log(res)
  } catch (err){
    console.log(err)
    
  }
}

render(){
  return (
    <>
      <div className='columns pink'>
        <div className='column is-half is-offset-one-quarter red'>
          <Stepper onChange={this.handleChange} {...this.state.formData} handleSubmit={this.handleSubmit} />
        </div>
      </div>
      
    </>
  )
}
}

export default Register