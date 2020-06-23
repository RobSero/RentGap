import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

function ImageSlider2(props){
  const [images, setImages] = React.useState(null)
  


  React.useEffect(()=>{
    const propertyImages = []
    propertyImages.push(props['image_main'])
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
    <div className='container'>
      <Carousel>
        
        {images.map((imageSource, index) => {
          return (
            <div key={index}>
              <img src={imageSource} alt='property-internal' />
              
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default ImageSlider2