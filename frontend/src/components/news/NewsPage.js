import React from 'react'
import LoadingSpinner from '../common/LoadingSpinners'
import NewsHeader from './NewsHeader'
import NewsFeed from './NewsFeed'
import { getNews } from '../../lib/api'
import { loadingTimer } from '../../lib/settings'

class NewsPage extends React.Component {
  state={
    articles: null
  }

  async componentDidMount(){
    setTimeout(async() => {
      try {
        const res = await getNews()
        this.setState({
          articles: res.data
        })
      } catch (err){
        console.log(err)
        
      }
    }, loadingTimer)
   
  }

  render(){
    if (!this.state.articles){
      return <LoadingSpinner />
    }
    return (
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
          <NewsHeader  />
        </div>
      
        <NewsFeed articles={this.state.articles} />
        
      </div>
      
     
      
      
    )
  }
}

export default NewsPage