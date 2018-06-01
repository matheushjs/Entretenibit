import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    marginLeft: "10%",
    marginRight: "10%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // Determines the size of the image
  },
  avatar: {
    margin: 3,
  }
};

const image_mapping = {
  "academic": "/path_to_academic_image",
  "theater": "/path_to_theater_image",
  "musical": "/path_to_musical_image",
  "unknown": "/path_to_unknown_image"
}

function SingleCard(props) {
  const {
    title,
    date,
    cardType,
    description,
    classes
  } = props;
  
  
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt="Thumbnail of an event."
              src={image_mapping[cardType]}
              className={classes.avatar}
            />
          }
          title={
            <Typography gutterBottom variant="headline" component="h2">
              {title}
            </Typography>
          }
          subheader={date}
        />
        <CardContent>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            See More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SingleCard.propTypes = {
  /* Title of the card */
  title: PropTypes.string.isRequired,

  /* Date of the event. For now only strings are allowed */
  subheader: PropTypes.string.isRequired,

  /* 
   * Type of the event that will be displayed in the card.
   * This determines the image that will be displayed in the card.
   */
  cardType: PropTypes.oneOf(["academic", "musical", "theater", "unknown"]),
  
  /* Description of the event */
  description: PropTypes.string,

  /* For use with withStyles() */
  classes: PropTypes.object.isRequired,
};


SingleCard.defaultProps = {
  cardType: "unknown",
  description: "Description unavailable."
}

export default withStyles(styles)(SingleCard);