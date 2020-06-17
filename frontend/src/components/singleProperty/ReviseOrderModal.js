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
      ModalTextRevise: `Are you sure you wish to alter your current investment of £${this.props.existingInvestment.toLocaleString()}?
      ${this.props.investment > this.props.existingInvestment ? 'You are increasing your investment by £' : 'You are decreasing your investment by £'}
      ${(Math.abs(this.props.investment - this.props.existingInvestment)).toLocaleString()}. This results in a TOTAL INVESTMENT OF: £${this.props.investment.toLocaleString()} 
      There will be a fee of £${(Math.abs((this.props.investment - this.props.existingInvestment) * 0.01)).toLocaleString()} for making this transaction.`,
      visibleRevise: true
    })
  };

  handleOkRevise = () => {
    
    this.setState({
      ModalTextRevise: 'Updating your investment..Please wait',
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
      ModalTextWithdraw: `Are you sure you wish to withdraw ALL of your investment of £${this.props.existingInvestment.toLocaleString()}? There will be a fee of £${Math.abs(this.props.existingInvestment * 0.01)} for making this transaction.`,
      visibleWithdraw: true
    })
  };

  handleOkWithdraw = () => {
    
    this.setState({
      ModalTextWithdraw: 'Withdrawing all of your investment...Crediting your account',
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
        {this.props.investment !== this.props.existingInvestment ?  <Button
          variant="contained"
          color={this.props.investment !== this.props.existingInvestment ? 'primary' : ''}
          style={{ marginRight: '10px' }}
          onClick={this.props.investment !== this.props.existingInvestment ? this.showModalRevise : ''}
        >
        Change Investment
        </Button> : ''}
       
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
          okText='I confirm this revision'
        >
          <p>{ModalTextRevise}</p>
        </Modal>
        <Modal
          title="Withdraw All Your Investment"
          visible={visibleWithdraw}
          onOk={this.handleOkWithdraw}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText='I confirm I want to withdraw all'
        >
          <p>{ModalTextWithdraw}</p>
        </Modal>
        
      </div>
    )
  }
}

export default ReviseOrderModal