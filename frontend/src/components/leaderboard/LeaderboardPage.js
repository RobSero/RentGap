import React from 'react'
import LeaderboardHeader from './LeaderboardHeader'
import LeaderTable from './LeaderTable'

function LeaderboardPage(){

  return (
    <>
      <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
        <LeaderboardHeader  />
      </div>
      <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
        <LeaderTable />
      </div>
    </>
  )
  
}

export default LeaderboardPage