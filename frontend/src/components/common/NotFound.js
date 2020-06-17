import React from 'react'
import { Result } from 'antd'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

function NotFound(){
  return (
    <div className='hero sub-section centered' style={{ height: '90vh' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to='/'><Button variant="contained"
          color="primary">Back Home</Button></Link>}
      />
    </div>
  )
}

export default NotFound

