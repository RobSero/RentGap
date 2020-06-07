import React from 'react'
import Sidebar from '../common/Sidebar'

class NewsPage extends React.Component {
  state={

  }

  render(){
    return (
      
      <div className="columns no-column-margin">
        <Sidebar />
        <div className="column is-four-fifths main-section ">
            NEWS
        </div>
      </div>
      
    )
  }
}

export default NewsPage