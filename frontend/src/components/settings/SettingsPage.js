import React from 'react'
import SettingsHeader from './SettingsHeader'
import { Collapse } from 'antd'
import EditProfileImageUpload from '../user/forms/EditProfileImageUpload'
import { getProfile, updateUserDetails } from '../../lib/api'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SimpleSelect from '../user/forms/SimpleSelect'
import SwitchLabels from '../user/forms/SwitchLabels'

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
    }
  }

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

  handleSubmit = async() => {
    try {
      const res = await updateUserDetails(this.state.user)
      console.log(res.data)
      window.location.reload(true)
    } catch (err){
      console.log(err)
    }
  }
  

  render(){
    const { user } = this.state
    return (
      <div style={{ overflowY: 'scroll',overflowX: 'hidden', height: '90vh', position: 'relative', width: '100%' }}>
        <div className='shadow' style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
          <SettingsHeader />
        </div>
        <div className='columns'>
          <div className='column is-8'>
            <div className='shadow' style = {{ backgroundColor: 'white', margin: '15px 30px' }}>
              <Collapse accordion>
                <Panel header="Avatar Settings" key="1">
                  <div className='centered'>
                    <EditProfileImageUpload handleChange={this.handleChange} image={user.profile_image}/>
                  </div>
                </Panel>
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
                <Panel header="Investing Details" key="3">
                  <SimpleSelect handleChange={this.handleChange} />
                  <SwitchLabels  handleChange={this.handleChange} />
                </Panel>
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
            >
                Delete Account
            </Button> 
          </div>
        </div>
      </div>
      
    )
  }
}

export default SettingsPage