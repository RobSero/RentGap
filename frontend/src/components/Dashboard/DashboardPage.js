import React from 'react'
import { getOrders, getProfile, getFeaturedProperties } from '../../lib/api'
import { Row, Col } from 'antd'
import DashboardHeader from './DashboardHeader'
import FeaturedPropCard from './FeaturedPropertyCard'
import NewsLoading from '../news/NewsLoading'
import LoadingSpinner from '../common/LoadingSpinners'
import { loadingTimer, thisMonth, months } from '../../lib/settings'



class DashboardPage extends React.Component {
  state={
    propertyData: null,
    orderData: null,
    user: null
  }

  async componentDidMount(){
    setTimeout(async()=> {
      try {
        const res = await getOrders()
        const userRes = await getProfile()
        const propRes = await getFeaturedProperties()

        console.log(res.data)
      
        this.setState({
          propertyData: propRes.data,
          orderData: res.data,
          user: userRes.data
        })
      } catch (err){
        console.log(err)
      }
    },loadingTimer)
  }

  render(){
    const { orderData, user, propertyData } = this.state
    if (!orderData){
      return <LoadingSpinner />
    }
    return (
      
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <div className='shadow' style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <DashboardHeader orders={orderData} user={user} />
        </div>
        <div style = {{ margin: '15px 30px' }}>
          <div className='centered'>
            <p className='page-title' style={{ color: 'rgba(17, 15, 15, 0.822)' }} >Featured Properties for {months[thisMonth]}</p>
          </div>
          
          <Row justify="center">
            {propertyData.map(property => {
              return <Col span={7} key={property.id} style={{ margin: '6px' }}>
                <FeaturedPropCard  {...property} />
              </Col>
            })}
          </Row>
        </div>
        <div className='centered'>
          <p className='page-title' style={{ color: 'rgba(17, 15, 15, 0.822)' }} > Latest Property News</p>
        </div>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
          <NewsLoading />
        </div>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
          <NewsLoading />
        </div>
      </div>
      
    )
  }
}

export default DashboardPage