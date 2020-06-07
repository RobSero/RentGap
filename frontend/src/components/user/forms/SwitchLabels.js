import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

function SwitchLabels(props) {


  return (
    <>
      <FormGroup row className='centered flex-center' >
        <FormControlLabel
          control={<Switch checked={false} onChange={props.handleChange} name="checkedA" />}
          label="Send Me Email Updates!"
          className='centered'
        />
      </FormGroup>

   
    </>
  )
}

export default SwitchLabels