import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
	card: {
		display: "block",
		margin: "auto",
		width: "65vw",
		minWidth: 275,
		textAlign: "justify",
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
		<div >
			<Card 
				className={classes.card}>
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
					<a
						href={props.link} >
						<Button>
							Saiba mais no site oficial do evento
						</Button>
					</a>
				</CardActions>
			</Card>
		</div> 
	);
}

SimpleCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
