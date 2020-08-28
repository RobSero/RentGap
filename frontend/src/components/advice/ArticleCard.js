import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'


function ArticleCard(props){
  // IF ARTICLE ID IS EVEN, IT WILL RENDER THE REVERSED STYLED ARTICLE CARD FOR ALTERNATING EFFECT. PURELY VISUAL, CONTENT REMAINS UNCHANGED
  if (props.article.id % 2 === 0){
    return (
      <div className='columns shadow' style = {{ backgroundColor: 'white', margin: '15px 30px', padding: 0 }}>
        <div className='column' style={{ padding: '0' }}>
          <Link to={`/advice/${props.article.id}`}>
            <img src={props.article.image} alt={props.article.title} style={{ width: '100%' }} />
          </Link>
        </div>
        <div className='column' style={{ padding: '25px' }}>
          <Link to={`/advice/${props.article.id}`}>
            <h1 style={{ fontSize: '20px', marginBottom: '4px' }}>{props.article.title}</h1>
  
            <Avatar src={props.article.author.profile_image} /><span style={{ margin: '2px 5px', color: 'grey', fontSize: '11px' }}>{props.article.author.username}</span>
            <hr />
            <p className='font-14'>{`${props.article.content.slice(0,250)}......`}</p>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className='columns shadow' style = {{ backgroundColor: 'white', margin: '15px 30px', padding: 0 }}>
      <div className='column' style={{ padding: '25px' }}>
        <Link to={`/advice/${props.article.id}`}>
          <h1 style={{ fontSize: '20px', marginBottom: '4px' }}>{props.article.title}</h1>

          <Avatar src={props.article.author.profile_image} /><span style={{ margin: '2px 5px', color: 'grey', fontSize: '11px' }}>{props.article.author.username}</span>
          <hr />
          <p className='font-14'>{`${props.article.content.slice(0,250)}......`}</p>
        </Link>
      </div>
      <div className='column' style={{ padding: '0' }}>
        <Link to={`/advice/${props.article.id}`}>
          <img src={props.article.image} alt={props.article.title} style={{ width: '100%' }} />
        </Link>
      </div>
    </div>
  )
}

export default ArticleCard