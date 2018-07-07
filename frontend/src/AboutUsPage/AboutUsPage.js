import React from "react";

import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import image1 from "./Images/Generic_Avatar.png";

import photoMarcello from "./Images/marcello.jpeg";
import photoMatheus from "./Images/matheus.jpeg";
import photoBruno from "./Images/bruno.jpeg";
import photoGabriel from "./Images/gabriel.jpg";

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
            marginLeft: "15%",
            marginRight: "15%"
          }}
        >
          <Typography
            style={{
              fontSize: "2.5vw",
              textAlign: "left",
              fontFamily: "Kalam",
              color: "#D0E5FF",
              textShadow: "0.75px 0.75px 7.5px #000000"
            }}
          >
            <b>Sobre o projeto</b>
          </Typography>

          <Typography
            style={{
              fontSize: "1.7vw",
              textAlign: "justify",
              fontFamily: "Kalam",
              color: "#FFFFFF",
              textShadow: "0.75px 0.75px 7.5px #000000"
            }}
          >
            {about.Info}
          </Typography>
        </div>
        <div
          className="AboutUs"
          style={{
            marginTop: "3vh",
            marginLeft: "15%",
            marginRight: "15%"
          }}
        >
          <Typography
            style={{
              fontSize: "2.5vw",
              textAlign: "left",
              fontFamily: "Kalam",
              color: "#D0E5FF",
              textShadow: "0.75px 0.75px 7.5px #000000"
            }}
          >
            <b>Desenvolvedores</b>
          </Typography>

          <GridList cellHeight={200} cols={2} style={{}}>
            <GridListTile cols={1}>
              <GridList cellHeight={150} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={photoMarcello}
                  alt="Generic_Avatar_1"
                  style={{ objectFit: "contain", clipPath: " circle(34% at center)" }}
                />

                <Typography
                  style={{
                    fontSize: "1.4vw",
                    textAlign: "left",
                    fontFamily: "Kalam",
                    color: "#FFFFFF",
                    textShadow: "0.75px 0.75px 7.5px #000000"
                  }}
                >
                  <b>Marcello Pagano</b><br />
                  {about.Marcello}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={photoBruno}
                  alt="Generic_Avatar_2"
                  style={{ objectFit: "contain", clipPath: " circle(34% at center)" }}
                />

                <Typography
                  style={{
                    fontSize: "1.4vw",
                    textAlign: "left",
                    fontFamily: "Kalam",
                    color: "#FFFFFF",
                    textShadow: "0.75px 0.75px 7.5px #000000"
                  }}
                >
                  <b>Bruno Coelho</b><br />
                  {about.Bruno}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={image1}
                  alt="Generic_Avatar_3"
                  style={{ objectFit: "contain", clipPath: " circle(34% at center)" }}
                />

                <Typography
                  style={{
                    fontSize: "1.4vw",
                    textAlign: "left",
                    fontFamily: "Kalam",
                    color: "#FFFFFF",
                    textShadow: "0.75px 0.75px 7.5px #000000"
                  }}
                >
                  <b>Felipe Siqueira</b><br />
                  {about.Felipe}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={photoGabriel}
                  alt="Generic_Avatar_4"
                  style={{ objectFit: "contain", clipPath: " circle(34% at center)" }}
                />

                <Typography
                  style={{
                    fontSize: "1.4vw",
                    textAlign: "left",
                    fontFamily: "Kalam",
                    color: "#FFFFFF",
                    textShadow: "0.75px 0.75px 7.5px #000000"
                  }}
                >
                  <b>Gabriel Cruz</b><br />
                  {about.Gabriel}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={photoMatheus}
                  alt="Generic_Avatar_5"
                  style={{ objectFit: "contain", clipPath: " circle(34% at center)" }}
                />

                <Typography
                  style={{
                    fontSize: "1.4vw",
                    textAlign: "left",
                    fontFamily: "Kalam",
                    color: "#FFFFFF",
                    textShadow: "0.75px 0.75px 7.5px #000000"
                  }}
                >
                  <b>Matheus Saldanha</b><br />
                  {about.Matheus}
                </Typography>
              </GridList>
            </GridListTile>
            <GridListTile cols={1}>
              <GridList cellHeight={125} cols={2} style={{ marginTop: "4%" }}>
                <img
                  src={image1}
                  alt="Generic_Avatar_6"
                  style={{ objectFit: "contain", clipPath: " circle(34% at center)" }}
                />

                <Typography
                  style={{
                    fontSize: "1.4vw",
                    textAlign: "left",
                    fontFamily: "Kalam",
                    color: "#FFFFFF",
                    textShadow: "0.75px 0.75px 7.5px #000000"
                  }}
                >
                  <b>Tiago Miranda</b><br />
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
