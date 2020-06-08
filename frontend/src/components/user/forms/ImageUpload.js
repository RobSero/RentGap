import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const uploadUrl = 'https://api.cloudinary.com/v1_1/dy7eycl8m/image/upload' // get this info from cloudinary
const uploadPreset = 'Property-Investor-Avatars' // get this info from cloudinary. Presets of what to do with image like cropping

class ImageUpload extends React.Component {
  state = {
    image: null
  }

  uploadURL = 'https://api.cloudinary.com/v1_1/dy7eycl8m/image/upload' // get this info from cloudinary
  uploadPreset = 'uke1baj3' // get this info from cloudinary. Presets of what to do with image like cropping

  handleUpload = async (event) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', this.uploadPreset)

    const res = await axios.post(this.uploadURL, data)
    console.log(res.data)

    this.setState({
      image: res.data.url
    }, ()=>{
      this.props.handleChange({ target: { name: 'profile_image', value: this.state.image } })
    })
  }

  render(){
    return (
      <>
        {this.state.image ? <img src={this.state.image} alt='picture-upload' className='avatar-upload' />  :
          <>
            <Button><label htmlFor="file-input-id">Upload</label></Button>
            <input type="file" id="file-input-id" onChange={this.handleUpload} />
          </>
        }
      </>
    )
  }
}

export default ImageUpload