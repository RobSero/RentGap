import React from 'react'
import ImageSlider from './ImageSlider'
import TabDisplay from './TabDisplay'
import Description from './Description'
import PropertyHeader from './PropertyHeader'
import LineChart from './LineChart'
import CommentSection from './CommentSection'
import InvestmentCalculator from './InvestmentCalculator'
import { getOneProperty, submitNewOrder, reviseOrder, clearOrder, getProfile } from '../../lib/api'
import { Alert } from 'antd'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import LoadingSpinner from '../common/LoadingSpinners'
import { isAuthenticated } from '../../lib/auth'


//  PAGE SHOWS ONE PROPERTY ALONG WITH INVESTMENT CALUCLATOR
class propertyShowPage extends React.Component {
  state={
    propertyData: null,
    orderData: null,
    newOrder: { // NEW ORDER RELATES TO THE CHANGES IN THE INVESTMENT CALCULATOR (INCLUDING EXISTING ORDERS WHICH ARE UPDATED). THIS WILL KEEP INVESTMENT CALCULATOR A CONTROLLED COMPONENT
      investment: null
    },
    revisedOrder: {
      invest: null,
      withdraw: null
    }
  }

  // ON MOUNT - GET PROPERTY DATA/USER DATA - IF USER HAS AN INVESTMENT (ORDER) FOR THIS PROPERTY, SET IT TO STATE
  async componentDidMount(){
    const propertyId = this.props.match.params.id
    try {
      const res = await getOneProperty(propertyId)
      const userRes = await getProfile()
      // IF BACKEND CONTROLLER CAN FIND AN ORDER WHICH MATCHES USER ID AND PROPERTY ID, SET IT TO STATE. RETURN NULL IF NOT
      if (res.data.order){
        this.openNotificationIfInvested()
        this.setState({
          propertyData: res.data.property,
          orderData: res.data.order,
          newOrder: {
            investment: (res.data.property.current_valuation * res.data.order.ownership)
          },
          user: userRes.data 
        })
      } else {
        this.setState({
          propertyData: res.data.property,
          orderData: res.data.order,
          user: userRes.data 
        })
      }
    } catch (err){
      console.log(err)
    }
  }



//  HANDLES CHANGE IN INVESTMENT (NEW OR EXISTING) WHEN USER CHANGES INVESTMENT CALCULATOR
handleChange = ({ target }) => {
  const value = target.value
  this.setState({
    newOrder: { // THIS WILL KEEP THE INVESTMENT CALCULATOR A CONTROLLED COMPONENT
      [target.name]: value
    }
  })
}


// SUBMIT A NEW ORDER TO THE BACKEND, CURRENTLY RELOADS ENTIRE APP IN BROWSER SO NAVBAR AND SIDEBAR ALSO RE-RENDER WITH NEW DATA 
handleNewOrderSubmit = async() => {
  const propertyId = this.state.propertyData.id
  if (this.state.newOrder.investment && this.state.orderData === null){
    try {
      await submitNewOrder(propertyId, this.state.newOrder)
      window.location.reload(true)
    } catch (err){
      console.log(err)
    }
  } else {
    console.log('YOU ALREADY HAVE AN INVESTMENT OR YOU HAVE NOT SET THE INVESTMENT AMOUNT')
  }
}

// RESET STATE AND CALCULATOR VALUES
handleClearData = () => {
  this.setState({
    newOrder: {
      investment: null
    }
  })
}

// UPDATES STATE DEPENDING ON IF THE USER IS INCREASING/DECREASING THEIR INVESTMENT. SAVED TO STATE IN A FORMAT THAT BACKEND WILL ACCEPT IN JSON
handleChangeRevisedOrder = ({ target }) => {
  const value = target.value
  if (value < 0){
    this.setState({
      revisedOrder: {
        withdraw: '',
        invest: Math.abs(value) // ENSURE NO NEGATIVE VALUE IS SENT TO BACKEND
      }
    })
  } else {
    this.setState({
      revisedOrder: {
        invest: '',
        withdraw: Math.abs(value) // ENSURE NO NEGATIVE VALUE IS SENT TO BACKEND
      }
    })
  }
}

// SUBMIT A REVISED ORDER TO THE BACKEND, CURRENTLY RELOADS ENTIRE APP IN BROWSER SO NAVBAR AND SIDEBAR ALSO RE-RENDER WITH NEW DATA 
handleRevisedOrderSubmit = async() => {
  const orderId = this.state.orderData.id
  try {
    await reviseOrder(orderId, this.state.revisedOrder)
    window.location.reload(true)
  } catch (err){
    console.log(err)
  }
}

// RETURNS ALL FUNDS TO USER ON PROPERTY AND RELOADS PAGE SO NAVBAR AND SIDEBAR ALSO RE-RENDER WITH NEW DATA 
handleWithdrawAll = async() => {
  const orderId = this.state.orderData.id
  try {
    await clearOrder(orderId)
    window.location.reload(true)
  } catch (err){
    console.log(err)
  }
}

// NOTIFICATION IF USER HAS INVESTED IN PROPERTY ON MOUNTING
openNotificationIfInvested = () => {
  notification.open({
    message: 'You have an investment in this property!',
    description:
      'Feel free to alter your current investment or withdraw all funds in the calculator below.',
    icon: <SmileOutlined style={{ color: '#108ee9' }} />
  })
};

notAuthRedirectHome = () => {
  this.props.history.push('/')
  window.location.reload(true)
}

render(){
  // Check if Auth
  if (!isAuthenticated()){
    this.notAuthRedirectHome()
  }
  const { propertyData, orderData, newOrder, user } = this.state
  // TEMPORARY LOADING SCREEN
  if (!propertyData){
    return <LoadingSpinner />
  }
  return (
    <>
      {/* ALERT USER OF THEIR INVESTMENT (IF REQUIRED) */}
      {orderData ? <Alert message={`Your investment of £${orderData.investment.toLocaleString(undefined, {
        maximumFractionDigits: 2
      })} in this property is currently worth £${(propertyData.current_valuation * orderData.ownership).toLocaleString(undefined, {
        maximumFractionDigits: 2
      })}`} type="success" closeText="Close Now" style={{ margin: '5px 30px' }} /> : '' }
      {/* HEADER SECTION */}
      <div className='shadow' style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
        <PropertyHeader {...propertyData} orderData={orderData}/>
      </div>
      {/* LEFT SIDE OF PROPERTY SHOW PAGE */}
      <div className='columns'>
        {/* LEFT SIDE OF PAGE - IMAGES, FLOORPLANS, MAPS, CALCULATOR */}
        <div className='column is-half'>
          <div className='information-container shadow'>
            <ImageSlider {...propertyData} />
          </div>
          {/* MAPS AND FLOORPLAN TABS */}
          <div className='information-container shadow'>
            <TabDisplay floorplan={propertyData.image_floorplan} lat={propertyData.latitude} lon={propertyData.longitude}/>
          </div>
          {/* INVESTMENT CALCULATOR */}
          <div className={'information-container shadow'}>
            <InvestmentCalculator {...propertyData} {...newOrder} 
              handleChange={this.handleChange} 
              handleNewOrderSubmit={this.handleNewOrderSubmit} 
              clearData={this.handleClearData} 
              existingOrderData={orderData}
              handleChangeRevisedOrder={this.handleChangeRevisedOrder}
              handleRevisedOrderSubmit={this.handleRevisedOrderSubmit}
              handleWithdrawAll={this.handleWithdrawAll}
              userMoney = {user.money}
            />
          </div>
          {/* RIGHT SIDE OF PROPERTY SHOW PAGE - DETAILS, CHART, COMMENTS */}
        </div>
        {/* DETAILS SECTION */}
        <div className='column is-half'>
          <div className='details-container shadow'>
            <h5 style={{ fontWeight: 600 }}>Property Overview:</h5>
            <br />
            {propertyData.description ? <p style={{ fontWeight: 300 }} className='font-14'>{propertyData.description}</p> : 
              <p style={{ fontWeight: 300 }} className='font-14'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>}
            <br />
            <Description {...propertyData}/>
            <LineChart {...propertyData} />
          </div>
          {/* COMMENTS SECTION */}
          <div className='details-container shadow'>
            <CommentSection propertyId={propertyData.id} />
          </div>
        </div>
      </div>
    </>
      
  )
}
}

export default propertyShowPage