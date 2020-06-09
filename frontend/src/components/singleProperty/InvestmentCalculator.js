import React from 'react'
import { Slider, InputNumber, Row, Col } from 'antd'
import Button from '@material-ui/core/Button'


function InvestmentCalculator(props){
  const [prop, setProp] = React.useState({ value: 0 })
  const propValue = 250000
  const propRent = 450
  const onChange = value => {
    console.log(prop)
    
    setProp({
      value: value
    })
  }


  return (
    <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
      <p style={{ backgroundColor: 'blue', width: '100%', height: '25px', color: 'white' }}>InvestmenT CALCULATOR</p>
      <p>Use the calculator to find which investment strategy is right for you</p>
      <div style={{ padding: '15px' }}>
        <Row style={{ margin: '20px 0 15px 15px' }}>
          <Col span={19}>
            <Slider
              min={10000}
              max={250000}
              onChange={onChange}
              value={typeof prop.value === 'number' ? prop.value : 0}
            />
          </Col>
          <Col span={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
            <InputNumber
              min={10000}
              max={250000}
            
              value={`£${prop.value}`}
              onChange={onChange}
            />
          </Col>
        </Row>
        <div>
          <Row style={{ margin: '15px' }}>
            <p>Current Value: £{propValue}</p>
            <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your Ownership: {(( prop.value / propValue ) * 100).toFixed(2)}%</p>
          </Row>
          <Row style={{ margin: '15px' }}>
            <p>Current Rental: £{propRent}</p>
            <p style={{ marginLeft: '25px', fontWeight: 700 }}>Your Monthly Rental: £{(( prop.value / propValue ) * propRent).toFixed(2)}pcm</p>
          </Row>
          <p>Please note there will be a 1% fee to your investment upon opening this order and withdrawal of investment </p>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
          >
        Invest
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: '10px' }}
          >
        Reset
          </Button>
        </div>
      </div>
     
    </div>
  )
}

export default InvestmentCalculator