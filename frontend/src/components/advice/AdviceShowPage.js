import React from 'react'
import { getArticle } from '../../lib/api'
import AdviceHeader from './AdviceHeader'
import { Avatar } from 'antd'

class AdviceShowPage extends React.Component {
  state={
    article: null
  }

  async componentDidMount(){
    const articleId = this.props.match.params.id
    try {
      const res = await getArticle(articleId)
      console.log(res.data)
      
      this.setState({
        article: res.data
      })
    } catch (err){
      console.log(err)
    }
  }

  render(){
    const { article } = this.state
    if (!article){
      return null
    }
    return (
      
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <AdviceHeader  {...article}/>
        </div>
        <div className='columns' style = {{ margin: '15px 30px', padding: 0 }}>
    
          <div className='column' style={{ padding: '25px', backgroundColor: 'white', marginRight: '10px' }}>
            <div style={{ backgroundColor: 'rgba(231, 231, 231, 0.947)' }}>
              <p>Author:</p>
              <Avatar src={article.author.profile_image} /><span style={{ margin: '2px 5px', color: 'grey', fontSize: '11px' }}>{article.author.username}</span>
            </div>
            <hr />
            <p>{article.content}</p>
          </div>
          <div className='column'  style={{ padding: 0, backgroundColor: 'white', marginLeft: '10px' }} >
            <img src={article.image} alt={article.title} style={{ width: '100%' }} />
          </div>
        </div>
        <div style = {{ margin: '15px 30px', backgroundColor: 'white', padding: '25px' }}>
          <p>{article.content}</p>
          <p>{article.content}</p>
          <p>{article.content}</p>
          <p>{article.content}</p>
          <p>{article.content}</p>
          <p>{article.content}</p>
          <p>{article.content}</p>
        </div>
      
        
      </div>
     
      
    )
  }
}

export default AdviceShowPage