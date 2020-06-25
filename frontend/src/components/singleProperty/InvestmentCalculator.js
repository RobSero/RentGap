import React from 'react'
import { Slider, InputNumber, Row, Col } from 'antd'
import ConfirmationModal from './Modal'
import { Alert } from 'antd'
import ReviseOrderModal from './ReviseOrderModal'



// THIS COMPONENT WILL INITIALLY CHECK IF THE USER ALREADY HAS AN INVESTMENT IN THE PROPERTY (ORDER) THIS CONDITIONAL WILL RENDER DIFFERENT CALCULATORS WITH DIFFERENT FUNCTIONALITY AND PROPS. BOTH CALCULATORS LOOK SIMILAR BUT AFFECT DIFFERENT ASPECTS OF THE PARENT STATE
function InvestmentCalculator(props){
  const propValue = props.current_valuation
  const propRent = props.rental_value
  const investment = props.investment
  const existingOrder = props.existingOrderData
  const fundsAvailable = existingOrder ? props.userMoney >= investment - (propValue * existingOrder.ownership) : ''

  if (!props){
    return null
  }
  return (
    <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
      <p style={{ backgroundColor: 'rgb(30, 21, 73)', width: '100%', height: '35px', color: 'white', fontSize: '20px' }}>Investment Calculator</p>
      {/* ALERT USER IF THEY HAVE AN INVESTMENT ALREADY */}
      {existingOrder ? <Alert message={`You have an investment of £${(propValue * existingOrder.ownership).toLocaleString(undefined, {
        maximumFractionDigits: 2
      })} in this property, but you can still edit your existing investment`} type="success" style={{ margin: '5px 15px' }} /> : '' }
      {/* CHECKS TO ENSURE USER IS NOT TRYING TO INVEST MORE THAN THEIR ACCOUNT FUNDS  */}
      {!existingOrder && props.userMoney < investment ? <Alert message='Insufficient Funds, Please revise your investment' type="warning" style={{ margin: '5px 15px' }} /> : '' }
      {existingOrder && !fundsAvailable ? <Alert message='Insufficient Funds, Please revise your investment' type="warning" style={{ margin: '5px 15px' }} /> : '' }
      <p>Use the calculator to find which investment strategy is right for you</p>
      {/* CALCULATOR ADAPTS BASED ON IF THERE IS AN EXISTING ORDER, RETURNS APPROPRIATE CALCULATOR */}
      {!existingOrder ?   
        <div style={{ padding: '15px' }}>
          {/* IF EXISTING ORDER DOES NOT EXIST, THIS CALCULATOR WILL BE DISPLAYED */}
          <Row style={{ margin: '20px 0 15px 15px' }}>
            {/* SLIDER AND INPUT BOX - BOTH CONTROLLED ELEMENTS BY PARENT STATE 'NEWORDER' */}
            <Col span={19}>
              <Slider
                min={10000}
                max={propValue}
                style = {{ color: 'red' }}
                onChange={(e)=>{
               
                  props.handleChange({ target: { name: 'investment', value: e } })
                }}
                value={typeof investment === 'number' ? investment : 0}
              />
            </Col>
            <Col span={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
              <InputNumber
                min={10000}
                max={propValue}
                onChange={(e)=>{
               
                  props.handleChange({ target: { name: 'investment', value: e } })
                }}
                value={typeof investment === 'number' ? investment : 0}
              />
            </Col>
          </Row>
          <div>
            {/* DETAILS WILL SHOW ABOUT THE INVESTMENT THE USER IS GOING TO MAKE - OWNERSHIP */}
            <Row style={{ margin: '15px' }}>
              <p>Current Value: £{propValue.toLocaleString()}</p>
              <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your Ownership: {(( investment / propValue ) * 100).toFixed(2)}%</p>
            </Row>
            <Row style={{ margin: '15px' }}>
              <p>Current Rental: £{propRent}</p>
              <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your Monthly Rental: £{(( investment / propValue ) * propRent).toFixed(2)}pcm</p>
            </Row>
            <p>Please note there will be a 1% fee to your investment upon opening this order and withdrawal of investment </p>
            {/* MODAL AND BUTTONS ARE AT THE BOTTOM TO CONFIRM CHANGES */}
            <ConfirmationModal handleNewOrderSubmit = {props.handleNewOrderSubmit} clearData={props.clearData} investment={investment} fundsAvailable={props.userMoney > investment} />
          </div>
        </div> :   


        <div style={{ padding: '15px' }}>
          {/* IF EXISTING ORDER DOES EXIST, THIS CALCULATOR WILL BE DISPLAYED */}
          <Row style={{ margin: '20px 0 15px 15px' }}>
            {/* SLIDER AND INPUT BOX - BOTH CONTROLLED ELEMENTS BY PARENT STATE 'NEWORDER' */}
            <Col span={19}>
              <Slider
                min={10000}
                max={propValue}
                onChange={(e)=>{
                  props.handleChangeRevisedOrder({ target: { name: 'changedOrder', value: (propValue * existingOrder.ownership) - e } })
                  props.handleChange({ target: { name: 'investment', value: e } })
                }}
                defaultValue={typeof propValue === 'number' ? propValue * existingOrder.ownership : 0}
                value={typeof investment === 'number' ? investment : 0}
              />
            </Col>
            <Col span={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
              <InputNumber
                min={10000}
                max={propValue}
                defaultValue={typeof propValue === 'number' ? propValue * existingOrder.ownership : 0}
                value={typeof investment === 'number' ? investment : 0}
                onChange={(e)=>{
                  props.handleChangeRevisedOrder({ target: { name: 'changedOrder', value: (propValue * existingOrder.ownership) - e } })
                  props.handleChange({ target: { name: 'investment', value: e } })
                }}
                
              />
            </Col>
          </Row>
          <div>
            {/* USER'S INVESTMENT DESCRIPTION */}
            <Row style={{ margin: '15px' }}>
              <p>You currently own {(existingOrder.ownership * 100).toFixed(2)}% of this property</p>
            </Row>
            {/* DETAILS WILL SHOW ABOUT THE INVESTMENT CHANGE IF THE USER INPUTS NEW VALUES */}
            <Row style={{ margin: '15px' }}>
              {investment - existingOrder.ownership * propValue !== 0 ? 
                <p>{investment - (existingOrder.ownership * propValue)  > 0 ? <span style={{ color: 'green' }}>You are increasing your investment by</span> : <span style={{ color: 'red' }}>You are decreasing your investment by</span>}  £{(Math.abs(investment - (existingOrder.ownership * propValue))).toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}</p> : ''
              }
              {/* IF NO CHANGE TO INVESTMENT, A MESSAGE IS RETURNED */}
              {investment - (existingOrder.ownership * propValue) === 0 ? <p>No Change to your investment</p> : '' }
            </Row>
            {/* IF THE USER CHANGES THEIR INVESTMENT, THIS SECTION WILL RENDER AND SHOW THE CHANGES TO THEIR OWNERSHIP AND RENTAL */}
            {investment - (existingOrder.ownership * propValue) !== 0 ? <><Row style={{ margin: '15px' }}>
              <p>Current Value: £{propValue.toLocaleString()}</p>
              <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your NEW Ownership: {(( investment / propValue ) * 100).toFixed(2)}%</p>
            </Row>
            <Row style={{ margin: '15px' }}>
              <p>Current Rental: £{propRent}</p>
              <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your NEW Rental: £{(( investment / propValue ) * propRent).toFixed(2)}pcm</p>
            </Row></> : '' }
            {/* MODAL AND BUTTONS ARE AT THE BOTTOM TO CONFIRM CHANGES */}
            <p>Please note there will be a 1% fee to your investment upon opening this order and withdrawal of investment </p>
            <ReviseOrderModal 
              handleNewOrderSubmit = {props.handleNewOrderSubmit} 
              clearData={props.clearData} 
              investment={investment}
              handleRevisedOrderSubmit={props.handleRevisedOrderSubmit}  
              handleWithdrawAll={props.handleWithdrawAll}
              existingInvestment={(existingOrder.ownership * propValue)}
              fundsAvailable = {fundsAvailable}
            />
          </div>
        </div> 
      }
    
      
    </div>
  )
}

export default InvestmentCalculator