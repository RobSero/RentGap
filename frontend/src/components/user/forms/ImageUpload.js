import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const uploadURL = 'https://api.cloudinary.com/v1_1/dy7eycl8m/image/upload' // get this info from cloudinary
const uploadPreset = 'uke1baj3' // get this info from cloudinary. Presets of what to do with image like cropping

class ImageUpload extends React.Component {
  state = {
    image: false
  }

handleUpload = async (e) => {
  // console.log(e.target.files[0])
  // const data = new FormData() //formdata use this class for sending images
  // data.append('file', e.target.files[0]) //attach the file to it once uploaded
  // data.append('upload_preset', uploadPreset) //attach preset field as a property
  // const res = await axios.post(uploadURL, data) // send to cloudinary to save and they will respond with a url to view the image (post cropped/edited from the presets)
  // // console.log(res.data)
  // this.setState({
  //   image: res.data.url
  // }, () => {
  //   this.props.onChange({ target: { name: 'image', value: 'INSERT STATE VALUE HERE' } }) // setState has a callback function which calls onChange and sends the values/name of the image. Best way to look at it is creating our own event object to be passed to the onChange prop in the parent (App.js) component
  // })
  
}

handleClick = () => {
  this.setState({
    image: !this.state.image
  })
}

render(){
  return (
    <>
      {
        this.state.image ? 
          <div>
            <img onClick={this.handleClick} src='https://londondrywall.co.uk/wp-content/uploads/2015/05/London-Drywall-11_Andrew-Hopkins.jpg' alt='image' className='avatar-upload' />
          </div> :
          <div className='centered '> 
            <div>
              <label htmlFor="file-upload" >
                <Button
                  variant="contained"
                  color="default"
                  
                  startIcon={<CloudUploadIcon />}
                  for='avatar'
                  className=" avatar-upload-button"
                > Upload Avatar
                </Button>
              </label>
              <input id="file-upload" type="file" name='avatarURL' onChange={this.props.handleChange}/>
            </div>
            
          </div>
      }
        
    </>
  )
}
}

export default ImageUpload