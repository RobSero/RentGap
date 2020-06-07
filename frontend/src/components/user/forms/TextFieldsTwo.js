import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import SimpleSelect from './SimpleSelect'
import SwitchLabels from './SwitchLabels'



// If there is an error:
// <TextField error id="standard-error" label="First Name" helperText="Incorrect entry." />


function TextFieldsTwo(props) {

  return (
    <form  noValidate autoComplete="off">
      <div className='centered'>
        <SimpleSelect handleChange={props.handleChange} />
        <SwitchLabels  handleChange={props.handleChange} />
      </div>
    </form>
  )
}

export default TextFieldsTwo