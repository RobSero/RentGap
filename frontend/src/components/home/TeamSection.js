import React from 'react'

function TeamSection() {
  return (
    <>
      <div className='columns' style={{ marginBottom: 0 }}>
        <div className='column team-Title styled-theme-background' style={{ padding: '5px' }}>
          <div style={{ width: '60%', margin: '0 auto' }}>
            <p style={{ color: 'white', fontSize: '22px', marginBottom: '2px' }}>RISK-FREE INVESTING</p>
            <p style={{ fontSize: '18px', fontWeight: '200'  }}>RentGap is a property investment simulation allowing you to track properties throughout the UK and invest using virtual currency based on live property data. You will be able to learn about property investing and build confidence in a RISK-FREE environment before you are ready to commit to anything serious. No card details required. </p>
            <p style={{ fontSize: '18px', fontWeight: '200'  }}>Using our built in analytics tools, you can track and assess your portfolio and watch it change over time in-line with the actual market. Every month you will accumulate rental income based on how much ownership you have on properties - Find a strategy that works best for you!</p>
          </div>
          
        </div>
      </div>
      <div className="columns no-column-margin" style={{ marginBottom: 0 }}>
        <div className="column height200px">

          <div className="columns sub-section">
            <div className="column">
              <div className='columns'>
                <div className='column is-4  team-member'>
                  <img src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591897673/Property_investor/pngwave_17_hbyemw.png' className='team-image' alt='searching' />
                  <p className='normal-sub-text'>Search and Watch</p>
                  <h5 className='thin-sub-text'>Browse through our hand picked selection of high quality and varied properties throughout the UK to find the right properties for you to invest in. </h5>
                </div>
                <div className='column is-4 team-member'>
                  <img src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591897673/Property_investor/pngwave_16_fg6zzk.png' className='team-image' alt='tracking' />
                  <p className='normal-sub-text'>Track Investments</p>
                  <h5 className='thin-sub-text'>Use our analytics tools to review your investments and assess what your next moves will be. RentGap allows you to maintain liquid assets and maintain complete control over your investments</h5>
                </div>
                <div className='column is-4  team-member'>
                  <img src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1591897673/Property_investor/pngwave_18_b92ixm.png' className='team-image' alt='ownership' />
                  <p className='normal-sub-text'>StressFree Property Ownership</p>
                  <h5 className='thin-sub-text'>Find an investment style that works best for: Manage your rental income and track the news to predict swings in the market or just sit back and watch your investments grow!</h5>
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