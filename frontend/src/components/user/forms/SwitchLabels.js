import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

function SwitchLabels(props) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <>
      <FormGroup row className='centered flex-center' >
        <FormControlLabel
          control={<Switch checked={state.checkedA} name="checkedA" onChange={handleChange} />}
          label="Send Me Email Updates!"
          className='centered'
        />
      </FormGroup>

   
    </>
  )
}

export default SwitchLabels