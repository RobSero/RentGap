import React from 'react'
import { List, Space } from 'antd'
import { StarOutlined } from '@ant-design/icons'


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

function NewsFeed(props){
  if (!props.articles) {
    return null
  }
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page)
        },
        pageSize: 5
      }}
      dataSource={props.articles}
      renderItem={article=> (
        <List.Item
          className='shadow'
          style = {{ margin: '15px', backgroundColor: 'white', marginLeft: '30px', marginRight: '30px' }}
          key={article.title}
          actions={[
            <a href={article.url_link} key={article.publishedAt} target='_blank' rel='noreferrer'>
              <IconText icon={StarOutlined} text={`Read more at the source - ${article.source}`} key="list-vertical-star-o" />
            </a>
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={article.image}
            />
          }
        >
          <List.Item.Meta
            title={<a href={article.url_link} target='_blank' rel='noreferrer'>{article.title}</a>}
            description={`Author - ${article.author}, ${article.source} `}
          />
          {article.description}
        </List.Item>
      )}
    />
  )
}
 

export default NewsFeed