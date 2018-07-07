import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

function LabelButtons(props) {
  const { classes } = props;

  return (
    <div style={{ display: "inline-block", padding: "0px 30px" }}>
      <Button
        onClick={props.onClick}
        size="large"
        className={classes.button}
        variant="raised"
        color="primary"
        style={{backgroundColor: "#CAD3E1", color: "#161616", boxShadow: "1px 1px 1px #000000"}}
      >
        {props.getText}
      </Button>
    </div>
  );
}

LabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LabelButtons);
