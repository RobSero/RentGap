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
  // Retrieve all news articles from database on mount
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
    }, loadingTimer) // small timeout set so page does not transition too quickly and feel unnatural
   
  }

  render(){
    // Temporary loading screen
    if (!this.state.articles){
      return <LoadingSpinner />
    }
    return (
      <>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
          <NewsHeader  />
        </div>
        <NewsFeed articles={this.state.articles} />
      </>
    )
  }
}

export default NewsPage