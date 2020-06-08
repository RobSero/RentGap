import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import DoneIcon from '@material-ui/icons/Done'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'




function SearchSection(props){

  const [searchField, updateSearch] = React.useState({
    region: null,
    bedrooms: null,
    max_price: null,
    min_price: null,
    outdoor_space: null,
    rental_value: null
  })

  const handlePropertyType = (value) => {
    if (searchField === value){
      props.handleChange({ target: { name: 'type', value: null } })
      updateSearch(null)
    } else {
      props.handleChange({ target: { name: 'type', value: value } })
      updateSearch(value)
    }
    
  }

  return (
    <div style={{  marginLeft: '30px',marginRight: '30px', height: '120px' }}>
      <form className='centered'>
        <FormControl style={{ width: '23%', marginLeft: '10px' }}>
          <InputLabel id="demo-simple-select-helper-label">Region</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={props.handleChange}
            name ='region'
            value={props.region}
          >
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value={'london'}><em>London</em></MenuItem>
            <MenuItem value={'southeast'}>South-East</MenuItem>
            <MenuItem value={'southwest'}>South-West</MenuItem>
            <MenuItem value={'midlands'}>Midlands</MenuItem>
            <MenuItem value={'northwest'}>North-West</MenuItem>
          </Select>
          <FormHelperText>Refine your location Search</FormHelperText>
        </FormControl>
        <FormControl style={{ width: '20%', marginLeft: '10px' }}>
          <InputLabel id="demo-simple-select-helper-label">Outdoor Area</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={props.handleChange}
            name ='outdoorSpace'
            value={props.outdoor_space}
          >
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value={'Garden'}><em>Garden</em></MenuItem>
            <MenuItem value={'Balcony Terrace'}>Balcony-Terrace</MenuItem>
            <MenuItem value={'Large Garden'}>Large Garden</MenuItem>
            <MenuItem value={'None'}>None</MenuItem>
          </Select>
          <FormHelperText>Refine by Outdoor Area</FormHelperText>
        </FormControl>
        <FormControl style={{ width: '20%', marginLeft: '10px' }}>
          <InputLabel id="demo-simple-select-helper-label">Finish Quality</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={props.handleChange}
            name ='finish'
            value={props.finish}
          >
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value={'Very High'}><em>Very High</em></MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
            <MenuItem value={'Average'}>Average</MenuItem>
            <MenuItem value={'Below Average'}>Below Average</MenuItem>
          </Select>
          <FormHelperText>Refine by overall Quality</FormHelperText>
        </FormControl>
        <FormControl style={{ width: '20%', marginLeft: '10px' }}>
          <InputLabel id="demo-simple-select-helper-label">Price Range</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={props.handleChange}
            name ='price'
            value={props.price}
          >
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value={1}><em>Up to £100,000</em></MenuItem>
            <MenuItem value={2}>£100,000 - £250,000</MenuItem>
            <MenuItem value={3}>£250,000 - £500,000</MenuItem>
            <MenuItem value={4}>£500,000 +</MenuItem>
          </Select>
          <FormHelperText>Refine by Budget</FormHelperText>
        </FormControl>
        <br />
        <br />
        <Chip label="Detached" onClick={()=>{
          handlePropertyType('Detached house')
        }} color={searchField === 'Detached house' ? 'primary' : ''} />

        <Chip label="Semi-detached house" onClick={()=>{
          handlePropertyType('Semi-detached house')
        }} color={searchField === 'Semi-detached house' ? 'primary' : ''} />

        <Chip label="Flat" onClick={()=>{
          handlePropertyType('Flat')
        }} color={searchField === 'Flat' ? 'primary' : ''} />
        <Chip label="Terrace" onClick={()=>{
          handlePropertyType('Terrace')
        }} color={searchField === 'Terrace' ? 'primary' : ''} />
        
      </form>
    </div>
    
  )

}

export default SearchSection