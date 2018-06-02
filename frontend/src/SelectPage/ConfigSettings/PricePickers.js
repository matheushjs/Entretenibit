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
    flexWrap: "wrap",
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  }
});

class PricePickers extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			price: (props.getPrice)
			};
			
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<FormControl className={classes.margin}>
					<InputLabel htmlFor="adornment-price">{this.props.getName}</InputLabel>
					<Input
						id="adornment-price"
						type="number"
						value={this.state.price}
						onChange={this.handleChange("price")}
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
					/>
				</FormControl>
			</div>
		);
	}
}

PricePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PricePickers);
