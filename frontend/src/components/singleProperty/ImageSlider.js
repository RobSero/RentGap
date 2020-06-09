import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props){
  const [images, setImages] = React.useState(null)
  const propertyImages = []


  React.useEffect(()=>{
    for (let i = 1; i < 10; i++){
      if (props[`image_${i}`]){
        propertyImages.push(props[`image_${i}`])
      }
      setImages(propertyImages)
      console.log('IMAGES')
      
    }
  },[props])
  
  
  
  if (!images){
    return null
  }

  return (
    <div className='container' style={{ height: '350px' }}>
      <Carousel>
        <div className='slide'>
          <img  alt='gym-pics' className='gym-img' src={props.image_main}/>
        </div> 
        {images.map((imageSource, index) => {
          return (
            <div className='slide' key={index}>
              <img alt='gym-pics' className='gym-img' src={imageSource}/>
            </div> 
          )
        })}
      </Carousel>
    </div>
  )
}

export default ImageSlider