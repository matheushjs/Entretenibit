import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SingleCard from './SingleCard'

class CardGrid extends React.Component{ //cars section (the third one)
	render(){
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<Grid container justify="center">
						<Grid key={1} item>
							<SingleCard
								title="Evento muito legal"
								date="1 de Janeiro"
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Grid container justify="center">
						<Grid key={2} item>
							<SingleCard
								title="Segundo evento muito legal"
								date="2 de Janeiro"
								description="O Evento Muito Legal invade a cidade de São Carlos com toda a eloquência esperada de um grupo de música pop."
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default CardGrid;