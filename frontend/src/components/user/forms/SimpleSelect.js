import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 280
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))


function SimpleSelect(props) {
  const classes = useStyles()

  return (
    <>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Experience</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={props.handleChange}
          >
            <MenuItem value={0}><em>First Time!</em></MenuItem>
            <MenuItem value={1}>Ive Played From Time to Time</MenuItem>
            <MenuItem value={2}>I am an Experienced Investor</MenuItem>
            <MenuItem value={3}>Prefer not to say</MenuItem>
          </Select>
          <FormHelperText>Have you some experience in investing?</FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Source</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={props.handleChange}
          >
            <MenuItem value={'google'}><em>Google</em></MenuItem>
            <MenuItem value={'mouth'}>Word of Mouth</MenuItem>
            <MenuItem value={'investorSite'}>Investor Website</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
          <FormHelperText>Where did you hear about us?          </FormHelperText>
        </FormControl>
        
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Goals</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={props.handleChange}
          >
            <MenuItem value={'google'}><em>Long Term Capital</em></MenuItem>
            <MenuItem value={'mouth'}>Short Term Capital</MenuItem>
            <MenuItem value={'investorSite'}>Consistent Rental Income</MenuItem>
            <MenuItem value={'Other'}>No Faith in Stock Market</MenuItem>
          </Select>
          <FormHelperText>Reason you are exploring property invesments? </FormHelperText>
        </FormControl>
        
      </div>
    </>
  )
}

export default SimpleSelect