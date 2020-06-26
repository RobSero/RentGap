import React from 'react'
import { Popover } from 'antd'



function NoPropertyNotify(){
  const [visible, handleVisibility] = React.useState(false)

  React.useEffect(()=>{
    const noOrders = () => {
      handleVisibility(true)
    }
    noOrders()
  }, [])


  const hide = () => {
    console.log('HEYYY')
    handleVisibility(false)
  }


  return (
    <span onClick={hide}>
      <Popover
        placement="right"
        content={<span className='watch-buttons'>You have no properties in your portfolio at the moment</span>}
        title={<span className='watch-buttons'>Start investing in Properties here!</span>}
        trigger="click"
        visible={visible}
      
      >
      </Popover>
    </span>
  )
 
}

export default NoPropertyNotify