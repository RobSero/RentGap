import React from 'react'
import ImageSlider from './ImageSlider'
import TabDisplay from './TabDisplay'
import Description from './Description'
import PropertyHeader from './PropertyHeader'
import LineChart from './LineChart'
import CommentSection from './CommentSection'
import InvestmentCalculator from './InvestmentCalculator'
import { getOneProperty, submitNewOrder, reviseOrder, clearOrder } from '../../lib/api'
import { Alert } from 'antd'





class propertyShowPage extends React.Component {
  state={
    propertyData: null,
    orderData: null,
    newOrder: {
      investment: null
    },
    revisedOrder: {
      invest: null,
      withdraw: null
    }
  }


  async componentDidMount(){
    const propertyId = this.props.match.params.id
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




handleChange = ({ target }) => {
  const value = target.value
  // console.log(`${target.name}: ${value}`)
  this.setState({
    newOrder: {
      [target.name]: value
    }
  })
}

handleNewOrderSubmit = async() => {
  const propertyId = this.state.propertyData.id
  if (this.state.newOrder.investment && this.state.orderData === null){
    try {
      const res = await submitNewOrder(propertyId, this.state.newOrder)
      console.log(res.data)
      window.location.reload(true)
    } catch (err){
      console.log(err)
    }
  } else {
    console.log('YOU ALREADY HAVE AN INVESTMENT OR YOU HAVE NOT SET THE INVESTMENT AMOUNT')
  }
}

handleClearData = () => {
  this.setState({
    newOrder: {
      investment: null
    }
  })
}

handleChangeRevisedOrder = ({ target }) => {
  const value = target.value
  console.log(`${target.name}: ${value}`)
  if (value < 0){
    this.setState({
      revisedOrder: {
        withdraw: '',
        invest: Math.abs(value)
      }
    })
  } else {
    this.setState({
      revisedOrder: {
        invest: '',
        withdraw: Math.abs(value)
      }
    })
  }
}

handleRevisedOrderSubmit = async() => {
  const orderId = this.state.orderData.id
  try {
    const res = await reviseOrder(orderId, this.state.revisedOrder)
    console.log(res.data)
    window.location.reload(true)
  } catch (err){
    console.log(err)
  }
}

handleWithdrawAll = async() => {
  const orderId = this.state.orderData.id
  try {
    const res = await clearOrder(orderId)
    console.log(res.data)
    console.log('WITHDRAWING ALL!')
    window.location.reload(true)
  } catch (err){
    console.log(err)
  }
}

render(){
  const { propertyData, orderData, newOrder } = this.state
  if (!propertyData){
    return <p>loading</p>
  }
  return (

      
    <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
      {orderData ? <Alert message={`You have an investment of £${orderData.investment} in this property`} type="info" closeText="Close Now" style={{ margin: '5px 30px' }} /> : '' }
      
      <div style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
        <PropertyHeader {...propertyData} orderData={orderData}/>
          
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
            <InvestmentCalculator {...propertyData} {...newOrder} 
              handleChange={this.handleChange} 
              handleNewOrderSubmit={this.handleNewOrderSubmit} 
              clearData={this.handleClearData} 
              existingOrderData={orderData}
              handleChangeRevisedOrder={this.handleChangeRevisedOrder}
              handleRevisedOrderSubmit={this.handleRevisedOrderSubmit}
              handleWithdrawAll={this.handleWithdrawAll}
            />
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