import React from 'react'

class DashboardPage extends React.Component {
  state={

  }

  render(){
    return (
      <>
        <h1>Triple Column</h1>
        <div className="columns height200px">
          <div className="column height100px is-one-quarter">
            One Full Width Column
          </div>
          <div className="column height100px">
            One Full Width Column
          </div>
        </div>
      </>
    )
  }
}

export default DashboardPage