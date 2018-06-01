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

const example = [
	[
		{
			title:"Workshop 1",
			date:"2 de Janeiro",
			type:"academic",
			description:"Um grande workshop",
		},
		{
			title:"Teatro 1",
			date:"3 de Janeiro",
			type:"theater",
			description:"Um pequeno teatro",
		},
	],
	[
		{
			title:"Orquestra 1",
			date:"4 de Janeiro",
			type:"musical",
			description:"OSUSP apresenta.",
		},
		{
			title:"Pré-Estreia dum filmão",
			date:"5 de Janeiro",
			type:"unknown",
			description:"Nada a declarar.",
		},
	],
	[
		{
			title:"Cansei de inventar títulos",
			date:"6 de Janeiro",
			type:"unknown",
			description:"Bleh.",
		},
	],
]

class CardGrid extends React.Component{ //cars section (the third one)
	render(){

		return (
			<Grid container spacing={24}>
				{	
					example.map( (value, index) => (
						<Grid item xs={12} >
							<Grid container justify="center" spacing={24}>
								{ 
									value[0] ?
									<Grid item xs={6} key={index*2 + 0}>
										<SingleCard
											title={value[0].title}
											date={value[0].date}
											type={value[0].type}
											description={value[0].description}
										/>
									</Grid>
								: null
								}
								
								
								{
									value[1] ?
										<Grid item xs={6} key={index*2 + 1}>
											<SingleCard
												title={value[1].title}
												date={value[1].date}
												type={value[1].type}
												description={value[1].description}
											/>
										</Grid>
									: null
								}
							</Grid>
						</Grid>
					))
				}
			</Grid>
		);
	}
}

export default CardGrid;