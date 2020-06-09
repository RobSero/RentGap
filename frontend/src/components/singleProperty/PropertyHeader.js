import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd'
import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'

function PropertyHeader(props){
  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title={props.title}
        extra={
          <Row>
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