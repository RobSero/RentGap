import React from 'react'
import { Modal } from 'antd'
import Button from '@material-ui/core/Button'







class ConfirmationModal extends React.Component {
  state = {
    ModalText: '',
    visible: false,
    confirmLoading: false
  };

 

  showModal = () => {
    this.setState({
      ModalText: `Are you sure you wish to make an investment of £${this.props.investment.toLocaleString(undefined, {
        maximumFractionDigits: 2
      })}? There will be a fee of £${(this.props.investment * 0.01).toLocaleString(undefined, {
        maximumFractionDigits: 2
      })} for making this transaction.`,
      visible: true
    })
  };

  handleOk = () => {
    
    this.setState({
      ModalText: 'Creating your investment...Exiciting Stuff!',
      confirmLoading: true
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      })
      
      this.props.handleNewOrderSubmit()
    }, 2000)
  };

  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false
    })
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state
    return (
      <div>
        <Button
          variant="contained"
          color={this.props.investment && this.props.fundsAvailable ? 'primary' : ''}
          style={{ marginRight: '10px' }}
          onClick={this.props.investment && this.props.fundsAvailable ? this.showModal : ''}
        >
        Invest
        </Button>
        <Button
          variant="contained"
          style={{ marginLeft: '10px' }}
          onClick = {this.props.clearData}
        >
        Reset
        </Button>
        
        
        <Modal
          title="Your Investment"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText='I confirm'
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    )
  }
}

export default ConfirmationModal