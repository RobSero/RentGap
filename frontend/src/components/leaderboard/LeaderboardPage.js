import React from 'react'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import LeaderboardHeader from './LeaderboardHeader'
import LeaderTable from './LeaderTable'

class LeaderboardPage extends React.Component {
  state={

  }

  componentDidMount(){
    this.openNotification()
  }

  openNotification = () => {
    notification.open({
      message: 'This part of the site is under construction!',
      description:
        'Check back in soon for all your property and investing news.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />
    })
  };

  render(){
    return (
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
          <LeaderboardHeader  />
        </div>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
          <LeaderTable />
        </div>
       
      </div>
      
     
      
      
    )
  }
}

export default LeaderboardPage