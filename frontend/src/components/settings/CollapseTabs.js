import React from 'react'
import { Collapse } from 'antd'

const { Panel } = Collapse


function CollapseTabs(props){
  return (
    <Collapse accordion>
      <Panel header="This is panel header 1" key="1">
        <p>aaa</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>aaa</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>aaa</p>
      </Panel>
    </Collapse>
  )
}
  

export default CollapseTabs