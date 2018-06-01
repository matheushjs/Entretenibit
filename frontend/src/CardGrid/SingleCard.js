import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

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
  "academic": "/card_icon_academic.png",
  "theater": "/card_icon_theater.png",
  "musical": "/card_icon_trumpet.png",
  "unknown": "/card_icon_box.png"
}

const credit_mapping = {
  "academic": "Icon made by Freepik at www.flaticon.com",
  "theater": "Icon made by Pixel Buddha at www.flaticon.com",
  "musical": "Icon made by Freepik at www.flaticon.com",
  "unknown": "Icon made by Good Ware at www.flaticon.com",
}


function SingleCard(props) {
  const {
    title,
    date,
    type,
    description,
    classes,
    link
  } = props;
  
  
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt={credit_mapping[type]}
              src={image_mapping[type]}
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
          <Link 
            to={link} >
          <Button size="small" color="primary">
            Ver Mais
          </Button>
          </Link>
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
  type: PropTypes.oneOf(["academic", "musical", "theater", "unknown"]),
  
  /* Description of the event */
  description: PropTypes.string,

  /* Link for the event page */
  link: PropTypes.string,

  /* For use with withStyles() */
  classes: PropTypes.object.isRequired,
};


SingleCard.defaultProps = {
  type: "unknown",
  description: "Description unavailable.",
  link: "*"
}

export default withStyles(styles)(SingleCard);