import React from 'react'
import Sidebar from '../common/Sidebar'

class DashboardPage extends React.Component {
  state={

  }

  render(){
    return (
      <div>
        <div className="columns container no-column-margin">
          <Sidebar />
          <div className="column ">
            One Full Width Column
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardPage