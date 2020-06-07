import React from 'react'
import Stepper from './Stepper'


class Register extends React.Component {
state = {
  formData: {
    
  }
}

handleChange = (event) => {
  console.log(`CHANGED : ${event.target.name} : ${event.target.value}`)
  if (event.target.checked) {
    console.log(`CHANGED : ${event.target.name} : ${event.target.checked}`)
  }
  
}

render(){
  return (
    <>
      <div className='columns pink'>
        <div className='column is-half is-offset-one-quarter red'>
          <Stepper onChange={this.handleChange} />
        </div>
      </div>
      
    </>
  )
}
}

export default Register