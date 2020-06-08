import React from 'react'
import ImageSlider from './ImageSlider'

class propertyShowPage extends React.Component {
  state={
    propertyData: null
  }

  render(){
    return (
      
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <h1 className='page-title'>Property Name</h1>
        <p className='page-title'>Property Address</p>
        <div className='columns'>
          <div className='column is-half'>
            <div className='information-container'>
              <ImageSlider />
            </div>
            

          </div>
          <div className='column is-half'>
            <div className='details-container'>
              <h5>Property Overview:</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default propertyShowPage