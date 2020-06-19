import React from 'react'
import { getOrders, getProfile, getFeaturedProperties, getWatchlist, watchToggle, getNews } from '../../lib/api'
import { newsAPI } from '../../lib/thirdpartyapi'
import { Row, Col } from 'antd'
import DashboardHeader from './DashboardHeader'
import FeaturedPropCard from './FeaturedPropertyCard'
import DashboardNewsFeed from './DashboardNewsFeed'
import LoadingSpinner from '../common/LoadingSpinners'
import { loadingTimer, thisMonth, months } from '../../lib/settings'



class DashboardPage extends React.Component {
  state={
    propertyData: null,
    orderData: null,
    user: null,
    watching: null,
    articles: null
  }

  async componentDidMount(){
    setTimeout(async()=> {
      try {
        const res = await getOrders()
        const userRes = await getProfile()
        const propRes = await getFeaturedProperties()
        const watchRes = await getWatchlist()
        const newsRes = await getNews()
        const watchingArray = watchRes.data.map(watchedProperty => {
          return watchedProperty.id
        })
        console.log(res.data)
      
        this.setState({
          propertyData: propRes.data,
          orderData: res.data,
          user: userRes.data,
          watching: watchingArray,
          articles: newsRes.data.splice(0,4)
        })
      } catch (err){
        console.log(err)
      }
    },loadingTimer)
  }

  handleWatch = async(propertyId) => {
    const res = await watchToggle(propertyId)
    const watchRes = await getWatchlist()
    const watchingArray = watchRes.data.map(watchedProperty => {
      return watchedProperty.id
    })
    this.setState({
      watching: watchingArray
    })
    console.log(res.data)
  }

  render(){
    const { orderData, user, propertyData, watching } = this.state
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
                <FeaturedPropCard  {...property} watching={watching} handleWatch={this.handleWatch} />
              </Col>
            })}
          </Row>
        </div>
        <div className='centered'>
          <p className='page-title' style={{ color: 'rgba(17, 15, 15, 0.822)' }} > Latest Property News</p>
        </div>
        <DashboardNewsFeed articles={this.state.articles} />
      </div>
      
    )
  }
}

export default DashboardPage