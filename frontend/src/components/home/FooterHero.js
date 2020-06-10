import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}))


function FooterHero(){
  const classes = useStyles()
  return (
    <section className="hero is-medium hero-background-two is-bold centered m-1">
      <div className="hero-body">
        <div className="container">
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

export default FooterHero