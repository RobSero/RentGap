import React from 'react'
import ImageSlider from './ImageSlider'
import TabDisplay from './TabDisplay'
import Description from './Description'
import PropertyHeader from './PropertyHeader'
import LineChart from './LineChart'
import CommentSection from './CommentSection'
import InvestmentCalculator from './InvestmentCalculator'

class propertyShowPage extends React.Component {
  state={
    propertyData: null
  }

  render(){
    return (
      
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <PropertyHeader />
          
        </div>
        
        <div className='columns'>
          <div className='column is-half'>
            <div className='information-container'>
              <ImageSlider />
              <TabDisplay />
              <InvestmentCalculator />
            </div>
            <br />
           
            

          </div>
          <div className='column is-half'>
            <div className='details-container'>
              <h5>Property Overview:</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <Description />
              <LineChart />
            </div>
            <div className='details-container'>
              <CommentSection />
            </div>
            
          </div>
        </div>
      </div>
      
    )
  }
}

export default propertyShowPage