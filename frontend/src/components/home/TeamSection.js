import React from 'react'


function TeamSection() {
  return (
    <>
      <div className='columns' style={{ marginBottom: 0 }}>
        <div className='column team-Title'>
          <p style={{ color: 'white' }}>Our Team</p>
        </div>
      </div>
      <div className="columns no-column-margin" style={{ marginBottom: 0 }}>
        <div className="column height200px">

          <div className="columns sub-section">
            <div className="column">
              <div className='columns'>
                <div className='column is-4  team-member'>
                  <img src='https://londondrywall.co.uk/wp-content/uploads/2015/05/London-Drywall-11_Andrew-Hopkins.jpg' className='team-image' />
                  <h4>Robert Serowka</h4>
                  <p>Founder</p>
                  <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h5>
                </div>
                <div className='column is-4 team-member'>
                  <img src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591820610/2_2018-Fox-Network-Upfront_g8jxwy.jpg' className='team-image' />
                  <h4>Gordon Ramsey</h4>
                  <p>Lead Property Manager</p>
                  <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h5>
                </div>
                <div className='column is-4  team-member'>
                  <img src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591820610/brooklyn-nine-nine-fame-terry-crews-slammed-on-twitter-for-his-controversial-black-supremacy-tweet-001_jnwskm.jpg' className='team-image' />
                  <h4>Terry Crews</h4>
                  <p>Head of Finance</p>
                  <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h5>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
  
}

export default TeamSection