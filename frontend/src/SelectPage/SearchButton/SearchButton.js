import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
import "font-awesome/css/font-awesome.min.css";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

function IconLabelButtons(props) {
  const { classes } = props;

  return (
    <div style={{ display: "inline-block"}}>

      <Button
        onClick={props.onClick}
        size="large"
        className={classes.button}
        variant="raised"
        color="primary"
      >
        <i class="fa fa-search"></i>
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelButtons);
