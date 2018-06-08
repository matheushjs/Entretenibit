import React from "react";
import Grid from "@material-ui/core/Grid";
import SingleCard from "./SingleCard";

import * as api from "../api/server";

class CardGrid extends React.Component {
  state = {
    cards: []
  };

  componentWillMount() {
    // const { type } = this.props;
    const some = api.getEventType("escolar");
    console.log(some);
  }

  render() {
    const { cards } = this.state;

    return (
      <Grid container spacing={24}>
        {cards.map((value, index) => (
          <Grid item xs={12} key={-index}>
            <Grid container justify="center" spacing={24}>
              {value[0] ? (
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
              ) : null}

              {value[1] ? (
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
              ) : null}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default CardGrid;
