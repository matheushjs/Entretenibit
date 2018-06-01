import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: "40vh;"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function CardGrid(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/card_image_placeholder.jpeg"
          title="Placeholder image"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Hello World
          </Typography>
          <Typography component="p">
            This is some secondary text.
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

CardGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardGrid);