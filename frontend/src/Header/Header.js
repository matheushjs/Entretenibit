import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import LabelButtons from "../SignUpPage/LabelButtons/LabelButtons";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default"
        style={{backgroundColor: "#3F7BD4"}}
      >
        <Toolbar>
          <Link style={{ textDecoration: "none" }} to="/home/">
            <Button
              variant="raised"
              onClick={props.homeButton}
              className={classes.menuButton}
              style={{
                boxShadow: "1px 1px 1px #000000"
              }}
            >
              Home
            </Button>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/aboutus/">
            <Button
              variant="raised"
              onClick={props.aboutUsButton}
              className={classes.menuButton}
              style={{
                boxShadow: "1px 1px 1px #000000"
              }}
            >
              Sobre Nós
            </Button>
          </Link>

          <p className={classes.flex} />

          <Link style={{ textDecoration: "none" }} to="/signup/">
            <LabelButtons onClick={null} getText={"Cadastre-se"}/>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
