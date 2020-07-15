import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}))


function Hero(){
  const classes = useStyles()
  return (
    <section className="hero is-large hero-background-one is-bold centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title title-main">
        Start Your Investments Today
          </h1>
          <h2 className="subtitle title-main">
        Easy, Stress-free, Safe
          </h2>
          <Link to='/register'>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
        Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero