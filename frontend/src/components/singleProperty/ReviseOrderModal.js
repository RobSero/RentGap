import React from 'react'
import { Modal } from 'antd'
import Button from '@material-ui/core/Button'


class ReviseOrderModal extends React.Component {
  state = {
    ModalTextRevise: 'Are you sure you wish to make this investment?',
    visibleRevise: false,
    confirmLoading: false,
    ModalTextWithdraw: 'Are you sure you wish to make this investment?',
    visibleWithdraw: false
  };

  showModalRevise = () => {
    this.setState({
      ModalTextRevise: `EDIT ORDER Are you sure you wish to make an investment of £${this.props.investment}? There will be a fee of £${this.props.investment * 0.01} for making this transaction.`,
      visibleRevise: true
    })
  };

  handleOkRevise = () => {
    
    this.setState({
      ModalTextRevise: 'The modal will be closed after two seconds',
      confirmLoading: true
    })
    setTimeout(() => {
      this.setState({
        visibleRevise: false,
        confirmLoading: false
      })
      this.props.handleRevisedOrderSubmit()
    }, 2000)
  };

  showModalWithdraw = () => {
    this.setState({
      ModalTextWithdraw: `CLEAR ORDER Are you sure you wish to make an investment of £${this.props.investment}? There will be a fee of £${this.props.investment * 0.01} for making this transaction.`,
      visibleWithdraw: true
    })
  };

  handleOkWithdraw = () => {
    
    this.setState({
      ModalTextWithdraw: 'The modal will be closed after two seconds',
      confirmLoading: true
    })
    setTimeout(() => {
      this.setState({
        visibleWithdraw: false,
        confirmLoading: false
      })
      this.props.handleWithdrawAll()
    }, 2000)
  };

  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visibleRevise: false,
      visibleWithdraw: false
    })
  };

  render() {
    const { visibleRevise, confirmLoading, ModalTextRevise, visibleWithdraw, ModalTextWithdraw } = this.state
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '10px' }}
          onClick={this.showModalRevise}
        >
        Invest
        </Button>
        <Button
          variant="contained"
          style={{ marginLeft: '10px' }}
          onClick = {this.showModalWithdraw}
        >
        Withdraw All
        </Button>
        
        
        <Modal
          title="Revise Your Investment"
          visible={visibleRevise}
          onOk={this.handleOkRevise}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalTextRevise}</p>
        </Modal>
        <Modal
          title="Withdraw All Your Investment"
          visible={visibleWithdraw}
          onOk={this.handleOkWithdraw}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalTextWithdraw}</p>
        </Modal>
        
      </div>
    )
  }
}

export default ReviseOrderModal