import React from 'react'
import SettingsHeader from './SettingsHeader'
import { Collapse } from 'antd'
import EditProfileImageUpload from '../user/forms/EditProfileImageUpload'
import { getProfile } from '../../lib/api'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SimpleSelect from '../user/forms/SimpleSelect'
import SwitchLabels from '../user/forms/SwitchLabels'
import { notification } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { isAuthenticated } from '../../lib/auth'
const { Panel } = Collapse


class SettingsPage extends React.Component {
  state={
    user: {
      username: null,
      email: null,
      profile_image: null,
      bio: null,
      first_name: null,
      last_name: null,
      existing_password: null,
      password: null,
      password_confirmation: null,
      experience: null
    },
    existingUser: {
      
    }
  }

  //  GET USERS INFORMATION
  async componentDidMount(){
    try {
      const res = await getProfile()
      this.setState({
        user: res.data
      })
    } catch (err){
      console.log(err)
    }
  }

  
  // HANDLE ANY INPUTS AND SET STATE
  handleChange = ({ target }) => {
    const inputValue = target.value
    console.log(`${target.name} : ${inputValue}`)
    this.setState({
      user: {
        ...this.state.user,
        [target.name]: inputValue
      }
    })
  }

  // SUBMIT NEW INFORMATION TO BACKEND
  handleSubmit = async() => {
    this.openNotification()
    // try {
    //   const res = await updateUserDetails(this.state.user)
    //   console.log(res.data)
    //   window.location.reload(true)
    // } catch (err){
    //   console.log(err)
    // }
  }
  

  openNotification = () => {
    notification.open({
      message: 'This functionality is currently in development',
      description:
        'Please check back very soon if you would like to edit your profile',
      icon: <WarningOutlined style={{ color: '#108ee9' }} />
    })
  };

  notAuthRedirectHome = () => {
    this.props.history.push('/')
    window.location.reload(true)
  }

  render(){
    // Check if Auth
    if (!isAuthenticated()){
      this.notAuthRedirectHome()
    }
    const { user } = this.state
    return (
      <>
        {/* HEADER SECTION */}
        <div className='shadow' style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <SettingsHeader />
        </div>

        <div className='columns'>
          {/* LEFT SIDE OF MAIN PAGE - USER INFORMATION FORM */}
          <div className='column is-8'>
            {/* COLLAPSABLE FORM SECTION */}
            <div className='shadow' style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
              <Collapse accordion>
                {/* SECTION 1 - IMAGE */}
                <Panel header="Avatar Settings" key="1">
                  <div className='centered'>
                    <EditProfileImageUpload handleChange={this.handleChange} image={user.profile_image}/>
                  </div>
                </Panel>
                {/* SECTION 2 - PERSONAL DETAILS */}
                <Panel header="Personal Details" key="2">
                  <div>
                    <TextField className='input-fields' id="standard-error" label="First Name" name='first_name' onChange={this.handleChange} value={user.first_name} />
                    <br />
                    <TextField className='input-fields' id="standard-error" label="Last Name" name='last_name' onChange={this.handleChange} value={user.last_name} />
                    <br />
                    <TextField className='input-fields' id="standard-error" label="Username" name='username' onChange={this.handleChange} value={user.username} />
                    <br />
                    <TextField className='input-fields' id="standard-error" label="Email" name='email' onChange={this.handleChange} value={user.email} />
                  </div>
                </Panel>
                {/* SECTION 3 - INVESTING DETAILS */}
                <Panel header="Investing Details" key="3">
                  <SimpleSelect handleChange={this.handleChange} />
                  <SwitchLabels  handleChange={this.handleChange} />
                </Panel>
                {/* SECTION 4 - PASSWORD */}
                <Panel header="Password" key="4">
                  <div>
                    <TextField className='input-fields' id="standard-error" label="Existing Password" name='existing_password' onChange={this.handleChange} value={user.existing_password} />
                    <TextField className='input-fields' id="standard-error" label="New Password" name='password' onChange={this.handleChange} value={user.password} />
                    <TextField className='input-fields' id="standard-error" label="Password Confirmation" name='password_confirmation' onChange={this.handleChange} value={user.password_confirmation} />
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>

          {/* RIGHT SIDE OF MAIN PAGE - BUTTONS */}
          <div className='column centered'>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              style={{ margin: '15px' }}
              className='shadow'
            >
                Update Account Details
            </Button> 
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: '15px' }}
              className='shadow'
              onClick={this.handleSubmit}
            >
                Delete Account
            </Button> 
          </div>
        </div>
      </>
      
    )
  }
}

export default SettingsPage