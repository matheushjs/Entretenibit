import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import "material-icons";

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
        style={{
          boxShadow: "1px 1px 1px #000000"
        }}
      >
        <i className="material-icons">search</i>
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelButtons);
