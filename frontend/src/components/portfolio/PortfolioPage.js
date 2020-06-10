import React from 'react'
import { List, Avatar, Space } from 'antd'
import { CarOutlined, ReloadOutlined, PoundCircleOutlined , FileOutlined } from '@ant-design/icons'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { getOrders, watchToggle, getWatchlist } from '../../lib/api'
import SearchSection from '../common/SearchSection'
import { Link } from 'react-router-dom'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

class PortfolioPage extends React.Component {
  state={
    orderData: null,
    filterData: {
      region: null,
      price: null,
      outdoorSpace: null,
      finish: null,
      type: null
    },
    watching: null,
    filteredOrders: null
  }

  async componentDidMount(){
    try {
      const res = await getOrders()
      const watchRes = await getWatchlist()
      console.log(res.data)
      const watchingArray = watchRes.data.map(watchedProperty => {
        return watchedProperty.id
      })
      console.log(res.data)
      
      this.setState({
        orderData: res.data,
        filteredOrders: res.data,
        watching: watchingArray
      })
    } catch (err){
      console.log(err)
    }
  }

handleChange = ({ target }) => {
  console.log(target)
  this.setState({
    filterData: {
      ...this.state.filterData,
      [target.name]: target.value
    }
  })
  setTimeout(()=>{
    this.filteredOrders()
  },1000)
}

filteredOrders = () => {
  const { orderData  } = this.state
  const { region, price, outdoorSpace, finish, type } = this.state.filterData
  let max,min
  switch (price) {
    case 1: max = 100000; min = 0; break
    case 2: max = 250000; min = 100000; break
    case 3: max = 500000; min = 250000; break
    case 4: max = 1500000; min = 500000; break
    default: max = 1500000; min = 0
  }
  console.log(`max: ${max} & min: ${min}`)
  
  const filteredOrderList = orderData.filter(order => {
    return (order.property_detail.region === region || region  === null) &&
    (order.property_detail.outdoor_space === outdoorSpace || outdoorSpace === null) &&
    (order.property_detail.finish === finish || finish === null) &&
    (order.property_detail.prop_type === type || type === null) &&
    order.property_detail.current_valuation < max && order.property_detail.current_valuation > min 
  })
  this.setState({ filteredOrders: filteredOrderList })
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
  if (!this.state.filteredOrders) {
    return <h1>LOADING</h1>
  }
    
  return (
    <div style={{ overflowY: 'scroll', height: '90vh', position: 'relative', width: '100%' }}>
      <div className='centered'>
        <h1 className='page-title'>Your Portfolio</h1>
      </div>
      <div className='centered' style = {{ backgroundColor: 'white', margin: '15px 30px', padding: '10px' }}>
        <SearchSection handleChange={this.handleChange} {...this.state.filterData} />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 5
        }}
        dataSource={this.state.filteredOrders}
        style = {{ margin: '15px' }}
        renderItem={order => (
          <List.Item
            style = {{ backgroundColor: 'white', margin: '15px', border: order.value_change !== 0 ? `${order.value_change > 0 ? 'thin solid green' : 'thin solid red' }`  : '' }}
            // PROPERTY MAP KEY
            key={order.id}
            // PRICE, WATCH, RENT
            actions={[
              <IconText icon={PoundCircleOutlined} text={`£${order.property_detail.current_valuation}`} key="list-vertical-star-o" />,
              <IconText icon={ReloadOutlined} text={`£${order.property_detail.rental_value}pcm`} key="list-vertical-like-o" />,
              <IconText icon={FileOutlined} text={order.property_detail.bedrooms} key="list-vertical-message" />,
              <IconText icon={CarOutlined} text={order.property_detail.parking} key="list-vertical-message" />
            ]}
            // MAIN PHOTO HERE
            extra={
              <Link to={`property/${order.property_detail.id}`}>
                <img
                  width={272}
                  alt="logo"
                  src={order.property_detail.image_main}
                />
              </Link>
            }
          >
            <List.Item.Meta
              // HEART BUTTON - WATCHLIST TOGGLE
              avatar={this.state.watching.includes(order.property_detail.id) ? <FavoriteIcon onClick = {() =>{
                this.handleWatch(order.property_detail.id)
              }} /> : <FavoriteBorderIcon onClick = {() =>{
                this.handleWatch(order.property_detail.id)
              }} />}
              // PROPERTY TITLE
              title={<><Link to={`property/${order.property_detail.id}`}><span>{order.property_detail.title}</span></Link><span style={{ color: order.value_change !== 0 ? `${order.value_change > 0 ? ' green' : ' red' }`  : 'blue' }}>:  {order.value_change}%</span></>}
              // PROPERTY DESCRIPTION
              description={order.property_detail.address}
            />
            <p>You invested in this property on: {order.created_at} at a valuation of : £{order.value_at_time}</p>
            {order.value_change !== 0 ? 
              <p>Your rental income from this property has {order.value_change > 0 ? 'increased' : 'decreased' } to £{(order.ownership * order.property_detail.rental_value).toFixed(2)}pcm </p> : <p>Your rental income from this property remains at £{(order.ownership * order.property_detail.rental_value).toFixed(2)}pcm </p> 
            }
            
          </List.Item>
        )}
      />
    </div>
      
  )
}
}

export default PortfolioPage






