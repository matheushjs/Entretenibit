import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rectangle from "react-rectangle";
import { Link } from "react-router-dom";

const styles = {
	card: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		marginBottom: 16,
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
};

function SimpleCard(props) {
	const { classes } = props;

	return (
		props.clicked ?
		<div style={ { 
			background: "#9e9e9e", 
			width: "100vw", 
			height: "100vh" 
			} }>
	
		<Rectangle >
			<Card className={classes.card}>
				<CardHeader
					title={
					<Typography 
							gutterBottom 
							variant="headline" 
							component="h2">
							{props.title}
						</Typography>
					}
					subheader={props.date}
				/>

				<CardContent>
					Sobre: {props.description}
				</CardContent>
				<CardActions>
					<Link
						to={props.link} >
						<Button>
							Saiba mais no site oficial do evento
						</Button>
					</Link>
				</CardActions>
			</Card>
			</Rectangle>
		</div> : null
	);
}

SimpleCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
