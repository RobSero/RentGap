import React from 'react'
import Sidebar from '../common/Sidebar'

class SettingsPage extends React.Component {
  state={

  }

  render(){
    return (
      
      <div className="columns no-column-margin">
        <Sidebar />
        <div className="column is-four-fifths main-section ">
            SETTINGS
        </div>
      </div>
      
    )
  }
}

export default SettingsPage