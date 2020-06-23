// Material UI - MediaCard
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  media: {
    height: 160
  }
})

function FeaturedPropCard(props) {
  const classes = useStyles()



  return (
    <Card className={`shadow ${classes.root}`}>
      <CardActionArea>
        <Link to={`property/${props.id}`}>
          <CardMedia
            className={classes.media}
            image={props.image_main}
            title="Contemplative Reptile"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="p" style={{ fontSize: '15px' }}>
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>{props.prop_type}</p>
            {props.region[0].toUpperCase() + props.region.substring(1)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {props.watching && props.watching.includes(props.id) ? <FavoriteIcon className='watch-buttons' onClick = {() =>{
            props.handleWatch(props.id)
          }} /> : <FavoriteBorderIcon className='watch-buttons' onClick = {() =>{
            props.handleWatch(props.id)
          }} />}
        </Button>
        <Button size="small" color="primary">
          <Link to={`property/${props.id}`}>
          Learn More
          </Link>
        </Button>
        
      </CardActions>
    </Card>
  )
}

export default FeaturedPropCard