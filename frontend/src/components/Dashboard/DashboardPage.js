import React from 'react'
import { getOrders, getProfile, getFeaturedProperties, getWatchlist, watchToggle, getNews } from '../../lib/api'
import { Row, Col } from 'antd'
import DashboardHeader from './DashboardHeader'
import FeaturedPropCard from './FeaturedPropertyCard'
import DashboardNewsFeed from './DashboardNewsFeed'
import LoadingSpinner from '../common/LoadingSpinners'
import { loadingTimer, thisMonth, months } from '../../lib/settings'
import { isAuthenticated } from '../../lib/auth'

// Handles and displays general user, property and news data
class DashboardPage extends React.Component {
  state={
    propertyData: null,
    orderData: null,
    user: null,
    watching: null,
    articles: null
  }

  // Retrieve all relevent data on mount
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
      
        this.setState({
          propertyData: propRes.data,
          orderData: res.data,
          user: userRes.data,
          watching: watchingArray,
          articles: newsRes.data.splice(0,4) // only requires top 4 news articles for this page
        })
      } catch (err){
        console.log(err)
      }
    },loadingTimer) // small timeout set so page does not transition too quickly and feel unnatural
  }

  // Toggles when properties are watched / unwatched. Retrieves new watchlist after each change
  handleWatch = async(propertyId) => {
    await watchToggle(propertyId)
    const watchRes = await getWatchlist()
    const watchingArray = watchRes.data.map(watchedProperty => {
      return watchedProperty.id
    })
    this.setState({
      watching: watchingArray
    })
  }

  notAuthRedirectHome = () => {
    this.props.history.push('/')
    window.location.reload(true)
  }

  render(){
    // Check if Auth
    if (!isAuthenticated()){
      this.notAuthRedirectHome()
    }
    const { orderData, user, propertyData, watching } = this.state

    // temporary display loading spinner
    if (!orderData){
      return <LoadingSpinner /> 
    }
    return (
      <>
        {/* Header Section */}
        <div className='shadow' style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <DashboardHeader orders={orderData} user={user} />
        </div>

        {/* Featured Properties Section */}

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

        {/* News articles section */}

        <div className='centered'>
          <p className='page-title' style={{ color: 'rgba(17, 15, 15, 0.822)' }} > Latest Property News</p>
        </div>
        <DashboardNewsFeed articles={this.state.articles} />
      </>
      
    )
  }
}

export default DashboardPage