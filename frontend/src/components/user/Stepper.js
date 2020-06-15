import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextFieldsOne from './forms/TextFieldsOne'
import TextFieldsTwo from './forms/TextFieldsTwo'
import TextFieldsThree from './forms/TextFieldsThree'
import LoadingSpinners from '../common/LoadingSpinners'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: 0,
    marginBottom: 0
  },
  instructions: {
    marginTop: 0,
    marginBottom: 0
  }
}))

function getSteps() {
  return ['Personal Information', 'Investing Background', 'Avatar']
}



function RegisterStepper(props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())
  const steps = getSteps()

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <div className='centered full-height-form'>
              <TextFieldsOne handleChange={props.onChange} {...props} errors={props.errors} />
            </div>
            
          </>
        )
      case 1:
        return (
          <>
            <div className='centered full-height-form'>
              <TextFieldsTwo handleChange={props.onChange} {...props}  />
            </div>
            
          </>
        )
      case 2:
        return (
          <>
            <div className='centered full-height-form'>
              <TextFieldsThree handleChange={props.onChange} {...props}   />
            </div>
            
          </>
        )
      default:
        return 'Unknown step'
    }
  }

  const isStepOptional = (step) => {
    return step === 1
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    // if (!props.first_name || !props.last_name || !props.username || !props.email){
    //   return
      
    // }
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error('You can\'t skip a step that isn\'t optional.')
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className='centered bottom-buttons'>
            <Typography className={classes.instructions}>
              <div className='top2margin'>
            Creating Account, Welcome to Investing!
                <LoadingSpinners />
              </div>
             
            </Typography>
          </div>
        ) : (
          <div className='centered bottom-buttons'>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              {activeStep === steps.length - 1 ? <Button
                variant="contained"
                color="primary"
                onClick={props.handleSubmit}
                className={classes.button}
              >
                Finish
              </Button> : <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>}
              
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegisterStepper
