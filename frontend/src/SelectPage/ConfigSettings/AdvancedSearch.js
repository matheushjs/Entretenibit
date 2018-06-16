import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import DatePickers from "./DatePickers";
import PricePickers from "./PricePickers";
import EventTypesCheckboxes from "./EventTypesCheckboxes";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 800,
    height: 200
  },
  subheader: {
    width: "100%"
  }
});

function AdvancedSearch(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={50} className={classes.gridList} cols={2}>
        <GridListTile cols={1}>
          <DatePickers 
            getName="Data Inicial" 
            id="min"
            getDate={props.date.min} 
            handleChange={props.changeHandler}
            updateInfo={props.updateInfo} />
        </GridListTile>

        <GridListTile cols={1}>
          <DatePickers 
            getName="Data Final" 
            id="max"
            getDate={props.date.max} 
            handleChange={props.changeHandler}
            updateInfo={props.updateInfo} />
        </GridListTile>

        <GridListTile cols={1}>
          <PricePickers 
            getName="Preço Inicial" 
            id="min"
            getPrice={props.price.min} 
            handleChange={props.changeHandler}
            updateInfo={props.updateInfo} />
        </GridListTile>

        <GridListTile cols={1}>
          <PricePickers 
            getName="Preço Final" 
            id="max"
            getPrice={props.price.max} 
            handleChange={props.changeHandler}
            updateInfo={props.updateInfo} />
        </GridListTile>
      </GridList>

      <EventTypesCheckboxes 
        checkBoxes={props.checkBoxes} 
        handleChange={props.changeHandler} />
    </div>
  );
}

AdvancedSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvancedSearch);
