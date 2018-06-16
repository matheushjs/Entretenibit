import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ClickedCard from "./ClickedCard";
import Popup from "reactjs-popup";

const styles = {
  card: {
    marginLeft: "10%",
    marginRight: "10%",
    textAlign: "justify"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // Determines the size of the image
  },
  avatar: {
    margin: 3
  }
};

const imageMapping = {
  academic: "/card_icon_academic.png",
  theater: "/card_icon_theater.png",
  musical: "/card_icon_trumpet.png",
  unknown: "/card_icon_box.png"
};

const creditMapping = {
  academic: "Icon made by Freepik at www.flaticon.com",
  theater: "Icon made by Pixel Buddha at www.flaticon.com",
  musical: "Icon made by Freepik at www.flaticon.com",
  unknown: "Icon made by Good Ware at www.flaticon.com"
};

class SingleCard extends Component {
  state = {
    title: this.props.title,
    date: this.props.date,
    type: this.props.type,
    description: this.props.description,
    classes: this.props.classes,
    link: this.props.link,
    cardAlign: this.props.cardAlign,
    alt: null,
    src: null,
  };

  /* Codacy forced me to do this. It wont allow creditMapping[type] */
  componentWillMount = () => {
    if (this.state.type === "academic") {
      this.setState({
        alt: creditMapping["academic"],
        src: imageMapping["academic"]
      });
    } else if (this.state.type === "theater") {
      this.setState({
        alt: creditMapping["theater"],
        src: imageMapping["theater"]
      });
    } else if (this.state.type === "musical") {
      this.setState({
        alt: creditMapping["musical"],
        src: imageMapping["musical"]
      });
    } else {
      this.setState({
        alt: creditMapping["unknown"],
        src: imageMapping["unknown"]
      });
    }
  };

  render() {
    return (
      <div>
        <Card className={this.state.classes.card}>
          <CardHeader
            avatar={
              <Avatar
                alt={this.state.alt}
                src={this.state.src}
                className={this.state.classes.avatar}
              />
            }
            title={
              <Typography gutterBottom variant="headline" component="h2">
                {this.state.title}
              </Typography>
            }
            subheader={this.state.date}
          />
          <CardContent>
            <Typography component="p">
              {this.state.description.substr(0, 250) +
                (this.state.description.length > 250 ? "..." : "")}
            </Typography>
          </CardContent>
          <CardActions>
            <Popup
              on={["hover"]}
              trigger={
                <Button
                  onClick={this.clickedCardHandler}
                  size="small"
                  color="primary"
                >
                  Ver Mais
                </Button>
              }
              position={this.state.cardAlign}
              contentStyle={{
                padding: "0px",
                border: "none",
                width: "65vw"
              }}
            >
              <ClickedCard
                title={this.state.title}
                date={this.state.date}
                link={this.state.link}
                description={this.state.description}
              />
            </Popup>
          </CardActions>
        </Card>
      </div>
    );
  }
}

SingleCard.propTypes = {
  /* Title of the card */
  title: PropTypes.string.isRequired,

  /* Date of the event. For now only strings are allowed */
  date: PropTypes.string.isRequired,

  /* 
	 * Type of the event that will be displayed in the card.
	 * This determines the image that will be displayed in the card.
	 */
  type: PropTypes.oneOf(["academic", "musical", "theater", "unknown"]),

  /* Description of the event */
  description: PropTypes.string,

  /* Link for the event page */
  link: PropTypes.string,

  /* For use with withStyles() */
  classes: PropTypes.object.isRequired
};

SingleCard.defaultProps = {
  type: "unknown",
  description: "Description unavailable.",
  link: "*"
};

export default withStyles(styles)(SingleCard);
