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



function TextFieldsThree(props) {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <ImageUpload handleChange={props.handleChange} />
        <p style={{ margin: 0, fontSize: '8px' }}>Click image to upload an avatar</p>
        <br />
        {'password' in props.errors ? <TextField style={{ marginTop: '-10px' }} fullWidth error helperText={props.errors.password[0]} id="standard-error" label="Password" name='password' type='password' onChange={props.handleChange} value={props.password} /> : <TextField style={{ marginTop: '-10px' }} fullWidth id="standard-error" label="Password" name='password' onChange={props.handleChange}  type='password' value={props.password} /> 
        }
        {'password_confirmation' in props.errors ? <TextField fullWidth error helperText={props.errors.password_confirmation[0]} id="standard-error" label="Confirm Password" name='password_confirmation' onChange={props.handleChange} value={props.password_confirmation} type='password' /> : <TextField fullWidth id="standard-error" label="Confirm Password" name='password_confirmation' onChange={props.handleChange}  type='password' value={props.password_confirmation} /> 
        }
      </div>
    </form>
  )
}

export default TextFieldsThree