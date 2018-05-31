import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function SimpleAppBar(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar 
				position="static" 
				color="default">

				<Toolbar>

					<Link 
						style= { { textDecoration:"none" } }
						to="/home" >
						<Button 
							variant="raised" 
							onClick={ props.homeButton } 
							className={ classes.menuButton }> 
							Home
						</Button>
					</Link>

					<Link
						style= { { textDecoration:"none" } }
						to="/aboutus" >
						<Button
							variant="raised" 
							className={ classes.menuButton }> 
							Sobre Nós
						</Button>
					</Link>

					<p className={classes.flex} />

					<Link 
						style= { { textDecoration:"none" } }
						to="/signup" >
						<Button 
							variant="raised" 
							color="primary" 
							className={ classes.menuButton }> 
							Cadastre-se!
						</Button>
					</Link>

				</Toolbar>
			</AppBar>
		</div>
	);
}

SimpleAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);

