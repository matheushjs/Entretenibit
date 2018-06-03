import React from "react";
import Grid from "@material-ui/core/Grid";
import SingleCard from "./SingleCard";

const bigTextTest=
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste"+
	"texto grande para teste";

const example = [
	[
		{
			title: "Workshop 1",
			date: "2 de Janeiro",
			type: "academic",
			description: "Um grande workshop"+bigTextTest,
			link: "https://www.lollapaloozabr.com/",
		},
		{
			title: "Teatro 1",
			date: "2 de Janeiro",
			type: "theater",
			description: "Um pequeno teatro"+bigTextTest,
			link: "http://oasiseventossc.com.br/",
		},
	],
	[
		{
			title: "Orquestra 1",
			date: "2 de Janeiro",
			type: "musical",
			description: "OSUSP apresenta.",
			link: "http://caipyra.python.org.br/",
		},
		{
			title: "Pré-Estreia dum filmão",
			date: "5 de Janeiro",
			type: "unknown",
			description: "Nada a declarar.",
			link: "http://randomeventlink.web/info",
		},
	],
	[
		{
			title: "Cansei de inventar títulos",
			date: "6 de Janeiro",
			type: "unknown",
			description: "Bleh.",
			link: "http://randomeventlink.web/info",
		},
	],
];

class CardGrid extends React.Component { //cars section (the third one)
	render() {

		return (
			<Grid container spacing={24}>
				{
					example.map((value, index) => (
						<Grid 
							item xs={12} 
							key={-index}>

							<Grid container justify="center" spacing={24}>
								{
									value[0] ?
										<Grid item xs={6} key={index * 2 + 0}>
											<SingleCard
												cardAlign="top left"
												title={value[0].title}
												date={value[0].date}
												type={value[0].type}
												description={value[0].description}
												link={value[0].link}
											/>
										</Grid>
										: null
								}

								{
									value[1] ?
										<Grid item xs={6} key={index * 2 + 1}>
											<SingleCard
												cardAlign="top center"
												title={value[1].title}
												date={value[1].date}
												type={value[1].type}
												description={value[1].description}
												link={value[1].link}
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
