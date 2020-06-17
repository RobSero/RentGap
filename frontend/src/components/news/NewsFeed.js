import React from 'react'
import { List, Avatar, Space } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'

const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}

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
      renderItem={item=> (
        <List.Item
          className='shadow'
          style = {{ margin: '15px', backgroundColor: 'white', marginLeft: '30px', marginRight: '30px' }}
          key={item.title}
          actions={[
            <a href={item.url} key={item.publishedAt}>
              <IconText icon={StarOutlined} text={`Read more at the source - ${item.source.name}`} key="list-vertical-star-o" />
            </a>
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={item.urlToImage}
            />
          }
        >
          <List.Item.Meta
            title={<a href={item.url}>{item.title}</a>}
            description={`Author - ${item.author}, ${item.source.name} `}
          />
          {item.description}
        </List.Item>
      )}
    />
  )
}
 

export default NewsFeed