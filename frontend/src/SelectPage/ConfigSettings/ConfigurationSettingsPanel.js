import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AdvancedSearch from "./AdvancedSearch";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function ConfigurationSettingsPanel(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <ExpansionPanel style={{boxShadow: "0.2px 0.2px 0.2px #000000"}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading} style={{ fontSize: "1.35vw" }}>
            Pesquisa Avançada:{" "}
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <AdvancedSearch
            date={props.date}
            price={props.price}
            changeHandler={props.changeHandler}
            checkBoxes={props.checkBoxes}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

ConfigurationSettingsPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfigurationSettingsPanel);
