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
        <Descriptions.Item label="Region">{props.region[0].toUpperCase() + props.region.substring(1)}</Descriptions.Item>
        <Descriptions.Item label="Property Type">{props.prop_type}</Descriptions.Item>
        <Descriptions.Item label="Construction Date">{props.construction_date}</Descriptions.Item>
        <Descriptions.Item label="Floor Area">{props.area}</Descriptions.Item>
        <Descriptions.Item label="Bedrooms">{props.bedrooms}</Descriptions.Item>
        <Descriptions.Item label="Bathrooms">{props.bathrooms}</Descriptions.Item>
        <Descriptions.Item label="Offstreet Parking">{props.parking}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default Description