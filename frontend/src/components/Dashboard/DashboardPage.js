import React from 'react'
import { getOrders, getProfile, getProperties } from '../../lib/api'
import { Row } from 'antd'
import DashboardHeader from './DashboardHeader'
import FeaturedPropCard from './FeaturedPropertyCard'

class DashboardPage extends React.Component {
  state={
    propertyData: null,
    orderData: null,
    user: null
  }

  async componentDidMount(){
    try {
      const res = await getOrders()
      const userRes = await getProfile()
      const propRes = await getProperties()

      console.log(res.data)
      
      this.setState({
        propertyData: propRes.data,
        orderData: res.data,
        user: userRes.data
      })
    } catch (err){
      console.log(err)
    }
  }

  render(){
    const { orderData, user } = this.state
    if (!orderData){
      return null
    }
    return (
      
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <div className='shadow' style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <DashboardHeader orders={orderData} user={user} />
        </div>
        <div style = {{ margin: '15px 30px' }}>
          <p>Featured Properties</p>
          <Row>
            <FeaturedPropCard />
            <FeaturedPropCard />
            <FeaturedPropCard />
          </Row>
        </div>
      </div>
      
    )
  }
}

export default DashboardPage