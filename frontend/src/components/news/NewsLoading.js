import React from 'react'
import { Skeleton, Switch, List, Avatar } from 'antd'
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'

const listData = []
for (let i = 0; i < 3; i++) {
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
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)

class NewsLoading extends React.Component {
  state = {
    loading: true
  };



  render() {
    const { loading } = this.state

    return (
      <div style={{ padding: '20px' }}>
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      </div>
    )
  }
}

export default NewsLoading