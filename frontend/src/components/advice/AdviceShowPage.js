import React from 'react'
import { getArticle } from '../../lib/api'
import AdviceHeader from './AdviceHeader'
import { Avatar } from 'antd'


//  Display advice article in view
class AdviceShowPage extends React.Component {
  state={
    article: null
  }

  //  Get single article from database
  async componentDidMount(){
    const articleId = this.props.match.params.id
    try {
      const res = await getArticle(articleId)
      const date = new Date(res.data.created_at)
      res.data.created_at = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      
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
      <>
        <div style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <AdviceHeader  {...article}/>
        </div>
        <div className='columns' style = {{ margin: '15px 30px', padding: 0 }}>
    
          <div className='column' style={{ padding: '25px', backgroundColor: 'white', marginRight: '10px' }}>
            <div className='shadow side-bar' style={{ padding: '10px',color: 'white' }}>
              <p style={{ display: 'inline', marginRight: '15px' }}>Author:</p>
              <Avatar src={article.author.profile_image} /><span style={{ margin: '2px 5px' }}>{article.author.username}</span>
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
      </>
    )
  }
}

export default AdviceShowPage