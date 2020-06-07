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
        <TextField fullWidth id="standard-error" label="First Name" name='fName' onChange={props.handleChange} />
        <br />
        <TextField fullWidth id="standard-error" label="Last Name" name='lName' onChange={props.handleChange} />
        <TextField fullWidth id="standard-error" label="Email" name='email' onChange={props.handleChange} />
        <TextField fullWidth id="standard-error" label="Username" name='username' onChange={props.handleChange} />
      </div>
    </form>
  )
}

export default TextFieldsOne