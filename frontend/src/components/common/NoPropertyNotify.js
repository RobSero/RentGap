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
    <Popover
      placement="right"
      content={<span onClick={hide}>You have no properties in your portfolio at the moment</span>}
      title={<span onClick={hide}>Start investing in Properties here!</span>}
      trigger="click"
      visible={visible}
    >
    </Popover>
  )
 
}

export default NoPropertyNotify