import React from 'react'
import ImageSlider from './ImageSlider'
import TabDisplay from './TabDisplay'
import Description from './Description'
import PropertyHeader from './PropertyHeader'
import LineChart from './LineChart'
import CommentSection from './CommentSection'
import InvestmentCalculator from './InvestmentCalculator'
import { getOneProperty } from '../../lib/api'



class propertyShowPage extends React.Component {
  state={
    propertyData: null,
    order: null
  }


  async componentDidMount(){
    const propertyId = 2
    try {
      const res = await getOneProperty(propertyId)
      console.log(res.data)
      this.setState({
        propertyData: res.data.property,
        orderData: res.data.order
      })
    } catch (err){
      console.log(err)
      
    }
  }








  render(){
    const { propertyData, orderData } = this.state
    if (!propertyData){
      return <p>loading</p>
    }
    return (

      
      
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <PropertyHeader {...propertyData}/>
          
        </div>

        {/* LEFT SIDE OF PROPERTY SHOW PAGE */}
        
        <div className='columns'>
          <div className='column is-half'>
            <div className='information-container'>
              <ImageSlider {...propertyData} />
            </div>
            <div className='information-container'>
              <TabDisplay floorplan={propertyData.image_floorplan} lat={propertyData.latitude} lon={propertyData.longitude}/>
            </div>
            <div className='information-container'>
              <InvestmentCalculator {...propertyData} />
            </div>
            
            {/* RIGHT SIDE OF PROPERTY SHOW PAGE */}

          </div>
          <div className='column is-half'>
            <div className='details-container'>
              <h5>Property Overview:</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <Description {...propertyData}/>
              <LineChart {...propertyData} />
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