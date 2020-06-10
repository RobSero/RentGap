import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd'
import React from 'react'


function AdviceHeader(props){
  return (
    <div>
      <PageHeader
        title={props.title}
        onBack={() => window.history.back()}
        extra={
          <Row>
            <Statistic title="Publish Date"  value={props.created_at} style={{
              margin: '0 20px'
            }} />
          </Row>
        }
      >
      </PageHeader>
    </div>
  )
}

export default AdviceHeader