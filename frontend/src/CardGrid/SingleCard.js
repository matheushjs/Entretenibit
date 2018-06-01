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
    width: "40vh;"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // Determines the size of the image
  },
};

const image_mapping = {
  "academic": "/path_to_academic_image",
  "theater": "/path_to_theater_image",
  "musical": "/path_to_musical_image"
}

function SingleCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt="Placeholder"
              src="/card_image_placeholder.jpeg"
              className={classes.avatar}
            />
          }
          title="Evento Muito Legal"
          subheader="28 de Julho"
        />
        <CardContent>
          <Typography component="p">
            O Evento Muito Legal invade a cidade de São Carlos com toda a eloquência esperada de um grupo de música pop.
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleCard);