import React from 'react'
import { Space, Spin } from 'antd'

function LoadingSpinners() {

  return (
    <div style={{ overflowY: 'scroll', height: '90vh', position: 'relative', width: '100%', textAlign: 'center' }}>
      <Space size="middle" style={{ marginTop: '30%' }}>
        <Spin size="large" />
        
      </Space>
    </div> 
  )
}

export default LoadingSpinners