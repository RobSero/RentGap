import React from 'react'
import { Table, Avatar } from 'antd'
import { getLeaders } from '../../lib/api'
import LoadingSpinner from '../common/LoadingSpinners'

function LeaderTable() {
  const [users, setUsers] = React.useState(null)


  React.useEffect(()=>{
    const getUsers = async() => {
      const res = await getLeaders()
      const ranked = res.data.map((user,index) => {
        user.key = index
        user.rank = index + 1
        const date = new Date(user.date_joined)
        user.date_joined = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        user.total_money = user.total_money.toLocaleString()
        return user
      })
      setUsers(ranked)
    }
    getUsers()
  },[])

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank'
    },
    {
      title: '',
      dataIndex: 'profile_image',
      key: 'profile_image',
      // eslint-disable-next-line react/display-name
      render: (url) => <Avatar src={url} />
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Total Assets (£)',
      dataIndex: 'total_money',
      key: 'total_money'
    },
    {
      title: 'Date Joined',
      dataIndex: 'date_joined',
      key: 'date_joined'
    }
  
  ]

  if (!users) {
    return <LoadingSpinner />
  }

  return (
    <Table columns={columns} dataSource={users} />
  )
}

export default LeaderTable