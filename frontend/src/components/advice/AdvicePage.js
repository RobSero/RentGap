import React from 'react'
import { getArticles } from '../../lib/api'
import ArticleCard from './ArticleCard'
import { loadingTimer } from '../../lib/settings'
import LoadingSpinner from '../common/LoadingSpinners'


class AdvicePage extends React.Component {
  state={
    articles: null
  }

  // Get all articles from database
  async componentDidMount(){
    setTimeout(async()=> {
      try {
        const res = await getArticles()
        this.setState({
          articles: res.data
        })
      } catch (err){
        console.log(err)
      }
    },loadingTimer) // small timeout set so page does not transition too quickly and feel unnatural
  }

  render(){
    const { articles } = this.state
    if (!articles){ // temporary display loading spinner
      return <LoadingSpinner /> 
    }
    return (
      <>
        {articles.map(article => {
          return (
            <ArticleCard article={article} key={article.id} />
          )
        })}
        
      </>
    )
  }
}

export default AdvicePage