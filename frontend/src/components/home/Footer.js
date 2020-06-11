import React from 'react'


function Footer(){
  const date = new Date()
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>RentGap</strong> by <a href="https://whispering-citadel-18475.herokuapp.com/#">Robert Serowka</a>. Real life data on this site is consumed via the <a href="https://propertydata.co.uk/">PropertyData</a> Third Party API 
        </p>
        <br />
        <p> Copyright {date.getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer