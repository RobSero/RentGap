import React from 'react'
import SimpleSelect from './SimpleSelect'
import SwitchLabels from './SwitchLabels'



// If there is an error:
// <TextField error id="standard-error" label="First Name" helperText="Incorrect entry." />


function TextFieldsTwo(props) {

  return (
    <form  noValidate autoComplete="off">
      <div className='centered'>
        <SimpleSelect handleChange={props.handleChange} {...props} />
        <SwitchLabels  handleChange={props.handleChange} />
      </div>
    </form>
  )
}

export default TextFieldsTwo