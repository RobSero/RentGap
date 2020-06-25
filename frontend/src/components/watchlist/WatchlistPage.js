import React from 'react'
import { List, Space } from 'antd'
import { CarOutlined, ReloadOutlined, PoundCircleOutlined , FileOutlined } from '@ant-design/icons'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { getWatchlist, watchToggle } from '../../lib/api'
import SearchSection from '../common/SearchSection'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinners'
import { loadingTimer, thisMonth, months } from '../../lib/settings'

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

  // GET ALL PROPERTIES WHICH ARE ON USERS WATCHLIST ON MOUNT
  async componentDidMount(){
    setTimeout(async()=> {
      try {
        const res = await getWatchlist()
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
    },loadingTimer) //SLIGHT DELAY TO FEEL MORE NATURAL
  }

  // HANDLES CHANGES TO STATE WHEN USER FILTERS PROPERTY
handleChange = ({ target }) => {
  console.log(target)
  this.setState({
    filterData: {
      ...this.state.filterData,
      [target.name]: target.value
    }
  })
  // MINOR DELAY BEFORE REFRESHING LIST 
  setTimeout(()=>{
    this.filteredProperties()
  },1000)
}

// HANDLES THE FILTERING OF PROPERTIES AND SETTING STATE WITH THE FILTERED PROPERTIES - RERENDERS THE LIST OF PROPERTIES
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
  
  const filteredPropertyList = propertyData.filter(property => {
    return (property.region === region || region  === null) &&
    (property.outdoor_space === outdoorSpace || outdoorSpace === null) &&
    (property.finish === finish || finish === null) &&
    (property.prop_type === type || type === null) &&
    property.current_valuation < max && property.current_valuation > min 
  })
  this.setState({ filteredProperties: filteredPropertyList })
}

// TOGGLES A PROPERTY TO WATCH IF USER CLICKS HEART, RE-RETRIEVES THE WATCHLIST DATA
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
// TEMPORARY LOADING
  if (!this.state.filteredProperties) {
    return <LoadingSpinner />
  }
    
  return (
    <>
      <div className='centered '>
        <h1 className='page-title'>Your {months[thisMonth]} Watchlist</h1>
      </div>
      {/* SEARCH AND FILTER SECTION */}
      <div className='centered shadow' style = {{ backgroundColor: 'white', margin: '15px 30px', padding: '10px' }}>
        <SearchSection handleChange={this.handleChange} {...this.state.filterData} />
      </div>
      {/* LIST COMPONENT PARENT */}
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
            className='shadow'
            // PROPERTY MAP KEY
            key={property.id}
            // PRICE, WATCH, RENT
            actions={[
              <IconText icon={PoundCircleOutlined} text={`£${property.current_valuation.toLocaleString()}`} key="list-vertical-star-o" />,
              <IconText icon={ReloadOutlined} text={`£${property.rental_value}pcm`} key="list-vertical-like-o" />,
              <IconText icon={FileOutlined} text={property.bedrooms} key="list-vertical-message" />,
              <IconText icon={CarOutlined} text={property.parking} key="list-vertical-message" />
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
              avatar={this.state.watching.includes(property.id) ? <FavoriteIcon className='watch-buttons' onClick = {() =>{
                this.handleWatch(property.id)
              }} /> : <FavoriteBorderIcon className='watch-buttons' onClick = {() =>{
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
    </>
  )
}
}

export default WatchlistPage






