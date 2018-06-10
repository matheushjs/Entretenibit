import React from "react";

import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import image1 from "./Images/Generic_Avatar.png" 
/*credits: http://charmscrp.wikia.com/wiki/File:Generic_Avatar.png*/

class AboutUsPage extends React.Component{ 
	//about us page (the main/parent page of this script)	
	render() {
		return (
			<div style={{marginBottom: "5vh"}}>
				<div className = "AboutProject" 
					style={{marginTop: "0vh", 
							marginLeft: "5%", 
							marginRight: "5%"}}>	
					
					<Typography style={{fontSize: "2vw", 
										textAlign: "left"}}>
						<b>Sobre o projeto</b> 
					</Typography>
					
					<Typography style={{fontSize: "1.5vw", 
										textAlign: "left"}}>
						Descricao do projeto, do grupo, etc. Descricao do projeto, do grupo, etc. Descricao do projeto, do grupo, etc.
						Descricao do projeto, do grupo, etc. Descricao do projeto, do grupo, etc. Descricao do projeto, do grupo, etc.
						Descricao do projeto, do grupo, etc. Descricao do projeto, do grupo, etc.
					</Typography>
					
				</div>
				<div className = "AboutUs" 
					style={{marginTop: "3vh", 
							marginLeft: "5%", 
							marginRight: "5%"}}>
					
					<Typography style={{fontSize: "2vw", 
										textAlign: "left"}}>
						<b>Integrantes</b> 
					</Typography>					
					
					<GridList cellHeight={125} cellWidht="45%" cols={2} style={{}}>
						<GridListTile cols={1}>
							<GridList cellHeight={125} cols={2} style={{marginTop: "4%"}}>
								<img src={image1} alt="Generic_Avatar_1" style={{objectFit: "contain"}}/>
								
								<Typography style={{fontSize: "1.2vw", 
													textAlign: "left"}}>
									Descricao do integrante.<br/>
									Descricao do integrante. Descricao do integrante. Descricao do integrante.
								</Typography>					
							</GridList>	
						</GridListTile>
						<GridListTile cols={1}>
							<GridList cellHeight={125} cols={2} style={{marginTop: "4%"}}>
								<img src={image1} alt="Generic_Avatar_2" style={{objectFit: "contain"}}/>
								
								<Typography style={{fontSize: "1.2vw", 
													textAlign: "left"}}>
									Descricao do integrante.<br/>
									Descricao do integrante. Descricao do integrante. Descricao do integrante.
								</Typography>					
							</GridList>
						</GridListTile>
						<GridListTile cols={1}>
							<GridList cellHeight={125} cols={2} style={{marginTop: "4%"}}>
								<img src={image1} alt="Generic_Avatar_3" style={{objectFit: "contain"}}/>
								
								<Typography style={{fontSize: "1.2vw", 
													textAlign: "left"}}>
									Descricao do integrante.<br/>
									Descricao do integrante. Descricao do integrante. Descricao do integrante.
								</Typography>					
							</GridList>
						</GridListTile>
						<GridListTile cols={1}>
							<GridList cellHeight={125} cols={2} style={{marginTop: "4%"}}>
								<img src={image1} alt="Generic_Avatar_4" style={{objectFit: "contain"}}/>
								
								<Typography style={{fontSize: "1.2vw", 
													textAlign: "left"}}>
									Descricao do integrante.<br/>
									Descricao do integrante. Descricao do integrante. Descricao do integrante.
								</Typography>					
							</GridList>
						</GridListTile>
						<GridListTile cols={1}>
							<GridList cellHeight={125} cols={2} style={{marginTop: "4%"}}>
								<img src={image1} alt="Generic_Avatar_5" style={{objectFit: "contain"}}/>
								
								<Typography style={{fontSize: "1.2vw", 
													textAlign: "left"}}>
									Descricao do integrante.<br/>
									Descricao do integrante. Descricao do integrante. Descricao do integrante.
								</Typography>					
							</GridList>
						</GridListTile>
						<GridListTile cols={1}>
							<GridList cellHeight={125} cols={2} style={{marginTop: "4%"}}>
								<img src={image1} alt="Generic_Avatar_6" style={{objectFit: "contain"}}/>
								
								<Typography style={{fontSize: "1.2vw", 
													textAlign: "left"}}>
									Descricao do integrante.<br/>
									Descricao do integrante. Descricao do integrante. Descricao do integrante.
								</Typography>					
							</GridList>
						</GridListTile>
					</GridList>
					
				</div>
			</div>
		);
	}
}

export default (AboutUsPage);
