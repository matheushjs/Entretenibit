import React from "react";

import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import image1 from "./Images/Generic_Avatar.png";

import photo_marcello from "./Images/marcello.jpeg";
import photo_matheus from "./Images/matheus.jpeg";
import photo_bruno from "./Images/bruno.jpeg";
import photo_gabriel from "./Images/gabriel.jpg";

import about from "./text";

/*credits: http://charmscrp.wikia.com/wiki/File:Generic_Avatar.png*/

class AboutUsPage extends React.Component {
  //about us page (the main/parent page of this script)
  render() {
    return (
      <div style={{ marginBottom: "5vh" }}>
        <div
          className="AboutProject"
          style={{
            marginTop: "0vh",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <Typography
            style={{
              fontSize: "2vw",
              textAlign: "left"
            }}
          >
            <b>Sobre o projeto</b>
          </Typography>

          <Typography
            style={{
              fontSize: "1vw",
              textAlign: "left"
            }}
          >
            {about.Info}
          </Typography>
        </div>
        <div
          className="AboutUs"
          style={{
            marginTop: "3vh",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <Typography
            style={{
              fontSize: "2vw",
              textAlign: "left"
            }}
          >
            <b>Desenvolvedores</b>
          </Typography>

          <GridList cellHeight={350} cellWidth="45%" cols={2} style={{}}>
            <GridListTile cols={1}>
              <GridList cellHeight={150} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={photo_marcello}
                  alt="Generic_Avatar_1"
                  style={{ objectFit: "contain" }}
                />

                <Typography
                  style={{
                    fontSize: "1.1vw",
                    textAlign: "left"
                  }}
                >
                  Marcello Pagano<br />
                  {about.Marcello}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={photo_bruno}
                  alt="Generic_Avatar_2"
                  style={{ objectFit: "contain" }}
                />

                <Typography
                  style={{
                    fontSize: "1.1vw",
                    textAlign: "left"
                  }}
                >
                  Bruno Coelho<br />
                  {about.Bruno}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={image1}
                  alt="Generic_Avatar_3"
                  style={{ objectFit: "contain" }}
                />

                <Typography
                  style={{
                    fontSize: "1.1vw",
                    textAlign: "left"
                  }}
                >
                  Felipe Siqueira<br />
                  {about.Felipe}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={photo_gabriel}
                  alt="Generic_Avatar_4"
                  style={{ objectFit: "contain" }}
                />

                <Typography
                  style={{
                    fontSize: "1.1vw",
                    textAlign: "left"
                  }}
                >
                  Gabriel Cruz<br />
                  {about.Gabriel}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={photo_matheus}
                  alt="Generic_Avatar_5"
                  style={{ objectFit: "contain" }}
                />

                <Typography
                  style={{
                    fontSize: "1.1vw",
                    textAlign: "left"
                  }}
                >
                  Matheus Saldanha<br />
                  {about.Matheus}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={image1}
                  alt="Generic_Avatar_6"
                  style={{ objectFit: "contain" }}
                />

                <Typography
                  style={{
                    fontSize: "1.1vw",
                    textAlign: "left"
                  }}
                >
                  Tiago Miranda<br />
                  {about.Tiago}
                </Typography>
              </GridList>
            </GridListTile>
          </GridList>
        </div>
      </div>
    );
  }
}

export default AboutUsPage;
