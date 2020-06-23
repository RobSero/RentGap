import { PageHeader, Statistic, Row } from 'antd'
import React from 'react'


function InvestmentHeader(props){

  const totalValues = {
    totalAssets: 0,
    totalInvested: 0,
    totalRental: 0
  }

  if (props.orders.length !== 0){
    props.orders.forEach(order => {
      totalValues.totalInvested += order.investment
      totalValues.totalAssets = totalValues.totalInvested + props.user.money
      totalValues.totalRental += order.property_detail.rental_value * order.ownership
    })
  } else {
    totalValues.totalAssets = props.user.money
  }


  return (
    <div>
      <PageHeader
        title={'Your Dashboard'}
        extra={
          <Row>
            <Statistic title="Total Assets" prefix="£" value={totalValues.totalAssets.toLocaleString(undefined, {
              maximumFractionDigits: 2
            })} style={{
              margin: '0 20px'
            }} />
            <Statistic title="Total Invested" prefix="£" value={totalValues.totalInvested.toLocaleString(undefined, {
              maximumFractionDigits: 2
            })} style={{
              margin: '0 20px'
            }} />
            <Statistic title="Total Rental Income" prefix="£" value={`${totalValues.totalRental.toLocaleString(undefined, {
              maximumFractionDigits: 2
            })}pcm`} style={{
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