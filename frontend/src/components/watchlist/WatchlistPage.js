import React from 'react'
import { List, Space } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { getWatchlist, watchToggle } from '../../lib/api'
import SearchSection from '../common/SearchSection'
import { Link } from 'react-router-dom'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

class WatchlistPage extends React.Component {
  state={
    propertyData: null,
    filterData: {
      region: null,
      price: null,
      outdoorSpace: null,
      finish: null,
      type: null
    },
    filteredProperties: null,
    watching: null
  }

  async componentDidMount(){
    try {
      const res = await getWatchlist()
      console.log(res.data)
      const watchingArray = res.data.map(watchedProperty => {
        return watchedProperty.id
      })
      
      this.setState({
        propertyData: res.data,
        filteredProperties: res.data,
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
    this.filteredProperties()
  },1000)
}

filteredProperties = () => {
  const { propertyData } = this.state
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
  console.log(propertyData[0])
  
  const filteredPropertyList = propertyData.filter(property => {
    return (property.region === region || region  === null) &&
    (property.outdoor_space === outdoorSpace || outdoorSpace === null) &&
    (property.finish === finish || finish === null) &&
    (property.prop_type === type || type === null) &&
    property.current_valuation < max && property.current_valuation > min 
  })
  this.setState({ filteredProperties: filteredPropertyList })
}

handleWatch = async(propertyId) => {
  await watchToggle(propertyId)
  const res = await getWatchlist()
  const watchingArray = res.data.map(watchedProperty => {
    return watchedProperty.id
  })

  this.setState({
    propertyData: res.data,
    watching: watchingArray
  })
  setTimeout(()=>{
    this.filteredProperties()
  },300)

}


render(){

  if (!this.state.filteredProperties) {
    return <h1>LOADING</h1>
  }
    
  return (
    <div style={{ overflowY: 'scroll', height: '90vh', position: 'relative', width: '100%' }}>
      <h1 className='page-title'>Your WatchList</h1>
      <SearchSection handleChange={this.handleChange} {...this.state.filterData} />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 5
        }}
        dataSource={this.state.filteredProperties}
        style = {{ margin: '15px' }}
        renderItem={property => (
          <List.Item
            style = {{ backgroundColor: 'white', margin: '15px' }}
            // PROPERTY MAP KEY
            key={property.id}
            // PRICE, WATCH, RENT
            actions={[
              <IconText icon={StarOutlined} text={`£${property.current_valuation}`} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={`£${property.rental_value}pcm`} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text={property.bedrooms} key="list-vertical-message" />
            ]}
            // MAIN PHOTO HERE
            extra={
              <Link to={`property/${property.id}`}>
                <img
                  width={272}
                  alt="logo"
                  src={property.image_main}
                />
              </Link>
            }
          >
            <List.Item.Meta
            // HEART BUTTON - WATCHLIST TOGGLE
              avatar={this.state.watching.includes(property.id) ? <FavoriteIcon onClick = {() =>{
                this.handleWatch(property.id)
              }} /> : <FavoriteBorderIcon onClick = {() =>{
                this.handleWatch(property.id)
              }} />}
              // PROPERTY TITLE
              title={<Link to={`property/${property.id}`}><p>{property.title}</p></Link>}
              // PROPERTY DESCRIPTION
              description={property.address}
            />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </List.Item>
        )}
      />
    </div>
      
  )
}
}

export default WatchlistPage






