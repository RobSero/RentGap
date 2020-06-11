import React from 'react'
import { Table, Tag, Space, Avatar } from 'antd'
import { getLeaders } from '../../lib/api'
import { loadingTimer, thisMonth, months } from '../../lib/settings'
import LoadingSpinner from '../common/LoadingSpinners'

function LeaderTable(props) {
  const [users, setUsers] = React.useState(null)


  React.useEffect(()=>{
    console.log('HEYYYY')
    const getUsers = async() => {
      const res = await getLeaders()
      const ranked = res.data.map((user,index) => {
        user.rank = index + 1
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
      title: 'Joined',
      dataIndex: 'date_joined',
      key: 'date_joined'
    }
  
  ]

  // const data = [
  //   {
  //     id: '1',
  //     username: 'John Brown',
  //     age: 32,
  //     total_money: 'New York No. 1 Lake Park'
  //   }
  // ]

  if (!users) {
    return <LoadingSpinner />
  }

  return (
    <Table columns={columns} dataSource={users} />
  )
}

export default LeaderTable