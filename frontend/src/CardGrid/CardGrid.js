import React from "react";
import Grid from "@material-ui/core/Grid";
import SingleCard from "./SingleCard";
import * as api from "../api/server";

class CardGrid extends React.Component {
  state = {
    cards: this.props.cards,
  };

  componentWillMount() {
    api.getEventType(
      this.props.title,
      this.props.type, 
      this.props.date, 
      this.props.price).then(cards => this.setState({ cards }));
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.title !== this.props.title
      || nextProps.type !== this.props.type 
      || nextProps.date !== this.props.date 
      || nextProps.price !== this.props.price) {

      api.getEventType(
        nextProps.title,
        nextProps.type,
        nextProps.date, 
        nextProps.price).then(cards => this.setState({ cards }));
    }
  }

  render() {
    const { cards } = this.state;

    let show = [];

    for (let i = 0; i < cards.length; i += 2) {
      const row = (
        <Grid item xs={12} key={i}>
          <Grid container justify="center" spacing={24}>
            {cards[i] ? (
              <Grid item xs={6} key={i * 2 + 0}>
                <SingleCard
                  cardAlign="top left"
                  title={cards[i].title}
                  date={cards[i].date}
                  type={cards[i].type}
                  description={cards[i].description}
                  link={cards[i].link}
                />
              </Grid>
            ) : null}

            {cards[i + 1] ? (
              <Grid item xs={6} key={i * 2 + 1}>
                <SingleCard
                  cardAlign="top center"
                  title={cards[i + 1].title}
                  date={cards[i + 1].date}
                  type={cards[i + 1].type}
                  description={cards[i + 1].description}
                  link={cards[i + 1].link}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      );

      show.push(row);
    }

    if (show.length === 0) {
      show.push(
        <Grid item xs={12} key={0}>
          <Grid container justify="center" spacing={24}>
            <SingleCard
              cardAlign="top left"
              title="Sem eventos"
              date={Date()}
              description="Não foram encontrados nenhum evento desse tipo.
                           Pesquise novamente mais tarde"
            />
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container spacing={24}>
        {show.map(value => value)}
      </Grid>
    );
  }
}

export default CardGrid;
