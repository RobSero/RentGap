import React from 'react'
import { List, Space } from 'antd'
import { CarOutlined, ReloadOutlined, PoundCircleOutlined , FileOutlined } from '@ant-design/icons'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { getProperties, getWatchlist, watchToggle } from '../../lib/api'
import SearchSection from '../common/SearchSection'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinners'
import { loadingTimer } from '../../lib/settings'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

class PropertiesPage extends React.Component {
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

  // GATHER ALL PROPERTIES AND USER'S WATCHLIST
  async componentDidMount(){
    setTimeout(async()=> {
      try {
        const res = await getProperties()
        const watchRes = await getWatchlist()
        // map the watched properties prior to setting state as only the id of each property is required.
        const watchingArray = watchRes.data.map(watchedProperty => {
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
    },loadingTimer) // small timeout set so page does not transition too quickly and feel unnatural
  }


  // Set state of filtered data when user selects - a delay of 1s prior to list updating
handleChange = ({ target }) => {
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

// Handles revising the list of properties shown based on the filtered criteria
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
    property.current_valuation <= max && property.current_valuation >= min 
  })
  this.setState({ filteredProperties: filteredPropertyList })
}

// handles watch/unwatch when user clicks on heart icon. Re-retrieves watchlist from database after
handleWatch = async(propertyId) => {
  await watchToggle(propertyId)
  const watchRes = await getWatchlist()
  // map the watched properties prior to setting state as only the id of each property is required.
  const watchingArray = watchRes.data.map(watchedProperty => {
    return watchedProperty.id
  })
  this.setState({
    watching: watchingArray
  })
}


render(){
  // Temporary loading screen
  if (!this.state.filteredProperties) {
    return <LoadingSpinner />
  }
    
  return (
    <>
      <div className='centered'>
        <h1 className='page-title'>Our Property List</h1>
      </div>
      <div className='centered shadow' style = {{ backgroundColor: 'white', margin: '15px 30px', padding: '10px' }}>
        <SearchSection handleChange={this.handleChange} {...this.state.filterData} />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
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
            {property.description ? <p>{property.description}</p> : 
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>}
          </List.Item>
        )}
      />
    </>
      
  )
}
}

export default PropertiesPage






