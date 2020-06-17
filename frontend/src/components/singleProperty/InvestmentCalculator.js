import React from 'react'
import { Slider, InputNumber, Row, Col } from 'antd'
import Button from '@material-ui/core/Button'
import ConfirmationModal from './Modal'
import { Alert } from 'antd'
import ReviseOrderModal from './ReviseOrderModal'

function InvestmentCalculator(props){
  const propValue = props.current_valuation
  const propRent = props.rental_value
  const investment = props.investment
  const existingOrder = props.existingOrderData



  if (!props){
    return null
  }
 

  return (
    <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
      <p style={{ backgroundColor: 'rgb(30, 21, 73)', width: '100%', height: '35px', color: 'white', fontSize: '20px' }}>Investment Calculator</p>
      {existingOrder ? <Alert message={`You have an investment of £${(propValue * existingOrder.ownership).toLocaleString(undefined, {
        maximumFractionDigits: 2
      })} in this property, but you can still edit your existing investment`} type="success" style={{ margin: '5px 15px' }} /> : '' }

      <p>Use the calculator to find which investment strategy is right for you</p>
      {/* CALCULATOR ADAPTS BASED ON IF THERE IS AN EXISTING ORDER */}
      {!existingOrder ?   
        <div style={{ padding: '15px' }}>
          <Row style={{ margin: '20px 0 15px 15px' }}>
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
            <Row style={{ margin: '15px' }}>
              <p>Current Value: £{propValue.toLocaleString()}</p>
              <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your Ownership: {(( investment / propValue ) * 100).toFixed(2)}%</p>
            </Row>
            <Row style={{ margin: '15px' }}>
              <p>Current Rental: £{propRent}</p>
              <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your Monthly Rental: £{(( investment / propValue ) * propRent).toFixed(2)}pcm</p>
            </Row>
            <p>Please note there will be a 1% fee to your investment upon opening this order and withdrawal of investment </p>
            <ConfirmationModal handleNewOrderSubmit = {props.handleNewOrderSubmit} clearData={props.clearData} investment={investment}/>
          </div>
        </div> :   


        <div style={{ padding: '15px' }}>
          <Row style={{ margin: '20px 0 15px 15px' }}>
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
            <Row style={{ margin: '15px' }}>
              <p>You currently own {(existingOrder.ownership * 100).toFixed(2)}% of this property</p>
            </Row>
            <Row style={{ margin: '15px' }}>
              {investment - existingOrder.ownership * propValue !== 0 ? 
                <p>{investment - (existingOrder.ownership * propValue)  > 0 ? <span style={{ color: 'green' }}>You are increasing your investment by</span> : <span style={{ color: 'red' }}>You are decreasing your investment by</span>}  £{(Math.abs(investment - (existingOrder.ownership * propValue))).toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })}</p> : ''
              }
              {investment - (existingOrder.ownership * propValue) === 0 ? <p>No Change to your investment</p> : '' }
            </Row>
            {investment - (existingOrder.ownership * propValue) !== 0 ? <><Row style={{ margin: '15px' }}>
              <p>Current Value: £{propValue.toLocaleString()}</p>
              <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your NEW Ownership: {(( investment / propValue ) * 100).toFixed(2)}%</p>
            </Row>
            <Row style={{ margin: '15px' }}>
              <p>Current Rental: £{propRent}</p>
              <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your NEW Rental: £{(( investment / propValue ) * propRent).toFixed(2)}pcm</p>
            </Row></> : '' }
            
            <p>Please note there will be a 1% fee to your investment upon opening this order and withdrawal of investment </p>
            <ReviseOrderModal 
              handleNewOrderSubmit = {props.handleNewOrderSubmit} 
              clearData={props.clearData} 
              investment={investment}
              handleRevisedOrderSubmit={props.handleRevisedOrderSubmit}  
              handleWithdrawAll={props.handleWithdrawAll}
              existingInvestment={(existingOrder.ownership * propValue)}
            />
          </div>
        </div> 
      }
    
      
    </div>
  )
}

export default InvestmentCalculator