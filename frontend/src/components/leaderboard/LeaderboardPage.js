import React from 'react'
import LeaderboardHeader from './LeaderboardHeader'
import LeaderTable from './LeaderTable'

function LeaderboardPage(){

  return (
    <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
      <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
        <LeaderboardHeader  />
      </div>
      <div style = {{ backgroundColor: 'white', margin: '15px 30px' }} className='shadow'>
        <LeaderTable />
      </div>
       
    </div>
  )
  
}

export default LeaderboardPage