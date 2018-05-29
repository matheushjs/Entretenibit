import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FileUpload from '@material-ui/icons/FileUpload';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Save from '@material-ui/icons/Save';
import { Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

const styles = theme => ({
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
});

function IconLabelButtons(props) {
	const { classes } = props;
	return (
		<div style={{display:'inline-block', padding:'0px 30px'}}>
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
				rel="stylesheet" />


			<BrowserRouter>
			<Link to={{pathname: props.searchLink}} className={classes.button}>
				<Button 
					size="large"
					className={classes.button} 
					variant="raised"
					color="primary">
					<Icon className={classes.rightIcon}>send</Icon>
				</Button>
			</Link>
			</BrowserRouter>
		</div>
	);
}

IconLabelButtons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);
