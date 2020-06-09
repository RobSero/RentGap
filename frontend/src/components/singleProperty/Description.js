import React from 'react'
import { Descriptions } from 'antd'

function Description(props) {



  return (
    <div>
      <Descriptions
        title="Property Overview"
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Region">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Property Type">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Construction Date">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Floor Area">$80.00</Descriptions.Item>
        <Descriptions.Item label="Bedrooms">$20.00</Descriptions.Item>
        <Descriptions.Item label="Bathrooms">$60.00</Descriptions.Item>
        <Descriptions.Item label="Offstreet Parking">$60.00</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default Description