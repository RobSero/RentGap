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

  // MODAL WILL SHOW IF USER WANTS TO CHANGE INVESTMENT
  showModalRevise = () => {
    this.setState({
      ModalTextRevise: `Are you sure you wish to alter your current investment of £${this.props.existingInvestment.toLocaleString(undefined, {
        maximumFractionDigits: 2
      })}?
      ${this.props.investment > this.props.existingInvestment ? 'You are increasing your investment by £' : 'You are decreasing your investment by £'}
      ${(Math.abs(this.props.investment - this.props.existingInvestment)).toLocaleString(undefined, {
        maximumFractionDigits: 2
      })}. This results in a TOTAL INVESTMENT OF: £${this.props.investment.toLocaleString(undefined, {
        maximumFractionDigits: 2
      })} 
      There will be a fee of £${(Math.abs((this.props.investment - this.props.existingInvestment) * 0.01)).toLocaleString(undefined, {
        maximumFractionDigits: 2
      })} for making this transaction.`,
      visibleRevise: true
    })
  };

  // ON CONFIRMATION OF INVESTMENT CHANGE, INVOKE PARENT FUNCTION TO SUBMIT IT
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

  //  MODAL WILL SHOW IF USER CHOOSES TO WITHDRAW ALL INVESTMENT
  showModalWithdraw = () => {
    this.setState({
      ModalTextWithdraw: `Are you sure you wish to withdraw ALL of your investment of £${this.props.existingInvestment.toLocaleString(undefined, {
        maximumFractionDigits: 2
      })}? There will be a fee of £${(Math.abs(this.props.existingInvestment * 0.01)).toLocaleString(undefined, {
        maximumFractionDigits: 2
      })} for making this transaction.`,
      visibleWithdraw: true
    })
  };

  // ON CONFIRMATION OF WITHDRAWING ALL, INVOKE PARENT FUNCTION TO SUBMIT IT
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

  // CANCEL AND HIDE THE MODAL
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
        {/* BUTTON WILL ONLY APPEAR IF USER CHANGES THEIR INVESTMENT - WILL NOT BE CLICKABLE IF USER'S INVESTMENT EXCEEDS THEIR ACCOU FUNDS */}
        {this.props.investment !== this.props.existingInvestment ?  <Button
          variant="contained"
          color={this.props.investment !== this.props.existingInvestment && this.props.fundsAvailable  ? 'primary' : ''}
          style={{ marginRight: '10px' }}
          onClick={this.props.investment !== this.props.existingInvestment && this.props.fundsAvailable  ? this.showModalRevise : ''}
        >
        Change Investment
        </Button> : ''}
        {/* WITHDRAW ALL BUTTON */}
        <Button
          variant="contained"
          style={{ marginLeft: '10px' }}
          onClick = {this.showModalWithdraw}
        >
        Withdraw All
        </Button>
        
        {/* REVISE INVESTMENT MODAL */}
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
        {/* WITHDRAW ALL MODAL */}
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