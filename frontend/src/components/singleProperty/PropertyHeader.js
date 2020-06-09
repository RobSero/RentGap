import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd'
import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'

function PropertyHeader(props){
  const currentVal = props.current_valuation
  const valueAtInvestment = props.orderData ?  props.orderData.value_at_time : 0
  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title={props.title}
        extra={
          <Row>
            {props.orderData ? <><Statistic 
              title="Investment Change" 
              value={`${((currentVal / valueAtInvestment) * 100) - 100}%`} 
              valueStyle={{ color: currentVal === valueAtInvestment ? 'black' : currentVal > valueAtInvestment ? 'green' : 'red' }} 
              style={{ margin: '0 20px' } }/> <Statistic title="Your Ownership" value={`${props.orderData.ownership.toFixed(4) * 100}%`} style={{
              margin: '0 20px'
            }} /></> : ''
            }
            <Statistic title="Current Value" prefix="£" value={props.current_valuation} style={{
              margin: '0 20px'
            }} />
            <Statistic title="Rental Value" prefix="£" value={`${props.rental_value}pcm`} style={{
              margin: '0 20px'
            }} />
          </Row>
        }
      >
      </PageHeader>
    </div>
  )
}

export default PropertyHeader