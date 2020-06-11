import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd'
import React from 'react'


function InvestmentHeader(props){

  const totalValues = {
    totalAssets: 0,
    totalInvested: 0,
    totalRental: 0
  }

  if (props.orders){
    props.orders.forEach(order => {
      totalValues.totalInvested += order.investment
      totalValues.totalAssets = totalValues.totalInvested + props.user.money
      totalValues.totalRental += order.property_detail.rental_value * order.ownership
    })
  }
  console.log(totalValues)


  return (
    <div>
      <PageHeader
        title={'Your Dashboard'}
        extra={
          <Row>
            <Statistic title="Total Assets" prefix="£" value={totalValues.totalAssets} style={{
              margin: '0 20px'
            }} />
            <Statistic title="Total Invested" prefix="£" value={totalValues.totalInvested} style={{
              margin: '0 20px'
            }} />
            <Statistic title="Total Rental Income" prefix="£" value={`${totalValues.totalRental.toFixed(2)}pcm`} style={{
              margin: '0 20px'
            }} />
          </Row>
        }
      >
      </PageHeader>
    </div>
  )
}

export default InvestmentHeader