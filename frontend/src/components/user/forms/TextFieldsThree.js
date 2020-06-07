import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import ImageUpload from './ImageUpload'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50%'
    }
  }
}))

// If there is an error:
// <TextField error id="standard-error" label="First Name" helperText="Incorrect entry." />

const handleChange = (e) => {
  console.log(e.target.name)
  
}


function TextFieldsThree(props) {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <ImageUpload handleChange={props.handleChange} />
        <TextField fullWidth id="standard-error" label="Password" name='password' type='password' onChange={props.handleChange} />
        <TextField fullWidth id="standard-error" label="Confirm Password" name='password2' type='password' onChange={props.handleChange} />
      </div>
    </form>
  )
}

export default TextFieldsThree