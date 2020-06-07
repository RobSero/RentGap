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
    <section className="hero is-large is-primary is-bold centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
        Start Your Investments Today
          </h1>
          <h2 className="subtitle">
        Easy, Stress-Free, Safe
          </h2>
          <Link to='/register'>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
        Start Investing Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero