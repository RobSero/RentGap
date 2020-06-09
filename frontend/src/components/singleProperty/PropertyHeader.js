import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd'
import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'

function PropertyHeader(props){
  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title='Property Title'
        subTitle="Address"
        extra={
          <Row>
            <Statistic title="Value" prefix="£" value={3345.08} style={{
              margin: '0 20px'
            }} />
            <Statistic title="Rental" prefix="£" value={3345.08} style={{
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