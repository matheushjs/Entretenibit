import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		margin: theme.spacing.unit,
	},
	cssLabel: {
		'&$cssFocused': {
			color: purple[500],
		},
	},
	cssFocused: {},
	cssUnderline: {
		'&:after': {
			borderBottomColor: purple[500],
		},
	},
	bootstrapRoot: {
		padding: 0,
		'label + &': {
			marginTop: theme.spacing.unit * 3,
		},
	},
	textFieldInput: {
		borderRadius: 2,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 20,
		padding: '10px 12px',
		width: 'calc(100% - 24px)',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
	bootstrapInput: {
		borderRadius: 2,
		backgroundColor: theme.palette.common.white,
		border: '1px solid #ced4da',
		fontSize: 20,
		margin: 'center',
		padding: '10px 12px',
		width: '200',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
	bootstrapFormLabel: {
		fontSize: 32,
	},
});

const theme = createMuiTheme({
	palette: {
		primary: green,
	},
});

function CustomizedInputs(props) {
	const { classes } = props;

	return (
		<div style={{display: 'inline-block'}} className={classes.container}>
				<TextField
					onChange={props.onChange}
					placeholder="O que você procura?"
					id="bootstrap-input"
					InputProps={{
						disableUnderline: true,
						classes: {
						root: classes.textFieldRoot,
						input: classes.textFieldInput,
						},
					}}
					InputLabelProps={{
					shrink: true,
					className: classes.textFieldFormLabel,
				}}
				style={{marginRight: 10, width: '60vw'}}
				/>
		</div>
	);
}

CustomizedInputs.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputs);
