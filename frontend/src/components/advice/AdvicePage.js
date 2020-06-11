import React from 'react'
import { getArticles } from '../../lib/api'
import ArticleCard from './ArticleCard'
import { loadingTimer, thisMonth, months } from '../../lib/settings'
import LoadingSpinner from '../common/LoadingSpinners'

class AdvicePage extends React.Component {
  state={
    articles: null
  }

  async componentDidMount(){
    setTimeout(async()=> {
      try {
        const res = await getArticles()
        console.log(res.data)
      
        this.setState({
          articles: res.data
        })
      } catch (err){
        console.log(err)
      }
    },loadingTimer)
  }

  render(){
    const { articles } = this.state
    if (!articles){
      return <LoadingSpinner />
    }
    return (
      
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        {articles.map(article => {
          return (
            <ArticleCard article={article} key={article.id} />
          )
        })}
        
      </div>
     
      
    )
  }
}

export default AdvicePage