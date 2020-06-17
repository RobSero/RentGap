import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd'
import React from 'react'


function SettingsHeader(props){

  return (
    <div>
      <PageHeader
        title={'Account Settings'}
        // extra={
        //   <Row>
        //     <Statistic title="Total Assets" prefix="£" value={5} style={{
        //       margin: '0 20px'
        //     }} />
        //   </Row>
        // }
      >
      </PageHeader>
    </div>
  )
}

export default SettingsHeader