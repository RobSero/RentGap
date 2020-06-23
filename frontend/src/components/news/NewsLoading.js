import React from 'react'
import { Skeleton } from 'antd'


function NewsLoading() {
  return (
    <div style={{ padding: '20px' }}>
      <Skeleton active avatar paragraph={{ rows: 4 }} />
    </div>
  )
  
}

export default NewsLoading