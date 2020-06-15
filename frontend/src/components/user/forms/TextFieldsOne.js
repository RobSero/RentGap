import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

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

function TextFieldsOne(props) {
  const classes = useStyles()

  return (
    <form className={classes.root} Validate autoComplete="off">
      <div>
        {'first_name' in props.errors ? <TextField fullWidth error helperText={props.errors.first_name[0]} id="standard-error" label="First Name" name='first_name' onChange={props.handleChange} value={props.first_name} /> : <TextField fullWidth id="standard-error" label="First Name" name='first_name' onChange={props.handleChange} value={props.first_name} /> 
        }
        <br />
        {'last_name' in props.errors ? <TextField fullWidth error helperText={props.errors.last_name[0]} id="standard-error" label="Last Name" name='last_name' onChange={props.handleChange} value={props.last_name} /> : <TextField fullWidth id="standard-error" label="Last Name" name='last_name' onChange={props.handleChange} value={props.last_name} /> }
        
        {'email' in props.errors ? <TextField fullWidth error helperText={props.errors.email[0]} id="standard-error" label="Last Name" name='email' onChange={props.handleChange} value={props.email} /> : <TextField fullWidth id="standard-error" label="Last Name" name='email' onChange={props.handleChange} value={props.email} /> }
        {'username' in props.errors ? <TextField fullWidth error helperText={props.errors.username[0]} id="standard-error" label="Last Name" name='username' onChange={props.handleChange} value={props.username} /> : <TextField fullWidth id="standard-error" label="Last Name" name='username' onChange={props.handleChange} value={props.username} /> }
      </div>
    </form>
  )
}

export default TextFieldsOne