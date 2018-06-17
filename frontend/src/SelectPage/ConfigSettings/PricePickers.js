import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

function PricePickers(props) {
    const { classes } = props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="adornment-price">
            {props.getName}
          </InputLabel>
          <Input
            id={props.id}
            type="number"
            value={props.getPrice}
            onChange={props.handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </div>
    );
}

PricePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PricePickers);
