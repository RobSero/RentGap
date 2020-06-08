import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props){





  return (
    <div className='container '>
      <Carousel>
        <div className='slide'>
          <img  alt='gym-pics' className='gym-img' src='https://londondrywall.co.uk/wp-content/uploads/2015/05/London-Drywall-11_Andrew-Hopkins.jpg'/>
        </div> 
        <div className='slide'>
          <img  alt='gym-pics' className='gym-img' src='https://londondrywall.co.uk/wp-content/uploads/2015/05/London-Drywall-11_Andrew-Hopkins.jpg'/>
        </div> 
        <div className='slide'>
          <img  alt='gym-pics' className='gym-img' src='https://londondrywall.co.uk/wp-content/uploads/2015/05/London-Drywall-11_Andrew-Hopkins.jpg'/>
        </div> 
      </Carousel>
    </div>
  )
}

export default ImageSlider