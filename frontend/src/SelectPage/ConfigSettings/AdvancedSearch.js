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
          <DatePickers getName="Data Inicial" getDate={new Date()} />
        </GridListTile>
        <GridListTile cols={1}>
          <DatePickers getName="Data Final" getDate={new Date()} />
        </GridListTile>
        <GridListTile cols={1}>
          <PricePickers getName="Preco Inicial" getPrice="0" />
        </GridListTile>
        <GridListTile cols={1}>
          <PricePickers getName="Preco Final" getPrice="0" />
        </GridListTile>
      </GridList>
      <EventTypesCheckboxes />
    </div>
  );
}

AdvancedSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvancedSearch);
