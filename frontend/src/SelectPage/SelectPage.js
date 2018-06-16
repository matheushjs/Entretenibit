import React from "react";
import CardGrid from "../CardGrid/CardGrid";
import ConfigurationSettingsPanel from "./ConfigSettings/ConfigurationSettingsPanel";
import SearchBar from "./SearchBar/SearchBar";
import SearchButton from "./SearchButton/SearchButton";

import {
  Route,
  Redirect
} from "react-router-dom";

class SelectPage extends React.Component {
  state = {
    configurationEventType: "Select",
    searchString: "",
    actualSearchString: "",
    checkBoxes: {
      academic: true,
      music: true,
      theater: true,
      others: true,
    },
    date: {
      min: null,
      max: null,
    },
    price: {
      min: "0",
      max: "0",
    },
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleStateParameters = (event) => {
    var curValue = null;
    var attr = null;

    if (event.target.type === "checkbox") {
      curValue = event.target.checked;
      attr = event.target.value;
      var checkBoxes = {...this.state.checkBoxes};
      checkBoxes[attr] = curValue;
      this.setState( { checkBoxes } );

    } else if (event.target.type === "date"){
      curValue = event.target.value;
      attr = event.target.id;
      var date = {...this.state.date};
      date[attr] = curValue;
      this.setState( { date } );

    } else if (event.target.type === "number"){
      curValue = event.target.value;
      attr = event.target.id;
      var price = {...this.state.price};
      price[attr] = curValue;
      this.setState( { price } );
    }
  
  }

  turnOnPageLinkHandler = event => {
    this.setState({
      actualSearchString: this.state.searchString
    });
  };

  render() {
    return (
      <div>

        <div className="SearchBarSection"
          style={{
            lineHeight: "3vh",
            display: "inline",
            margin: "auto"
          }}
        >
        <SearchBar
          onChange={this.handleInputChange}
          onEnter={this.turnOnPageLinkHandler}
          getValue={this.state.searchString}
          textStyle={{
            margin: "auto",
            width: "50vw"
          }}
        />

        <SearchButton onClick={this.turnOnPageLinkHandler}/>

		<Route
          path="/(home|search)/"
          render={() => {
            return (
              <Redirect
                to={this.props.pathComplement + this.state.actualSearchString}
              />
            ); 
           }}
        />

        </div>

        <div
          className="ConfigurationSection"
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "5%" }} >
          <ConfigurationSettingsPanel
            triggerParentHandleInputChange={this.handleInputChange}
            getParentConfigurationEventType={this.state.configurationEventType}
            date={this.state.date}
            price={this.state.price}
            changeHandler={this.handleStateParameters.bind(this)}
            checkBoxes={this.state.checkBoxes}
          />
        </div>

        <div
          className="CardsSection"
          style={{ marginTop: 20, marginBottom: 20 }} >

          <CardGrid type={this.state.actualSearchString} />
        </div>

        <div>
          <b>
            Just a test (use this props in the future):{" "}
              {this.state.actualSearchString}
          </b>
        </div>

      </div>
    );
  }
}

SelectPage.defaultProps = {
  backgroundImage:
    "https://images.pexels.com/photos/34650" +
    "/pexels-photo.jpg?" +
    "auto=compress&" +
    "cs=tinysrgb&" +
    "h=650&w=940",
  searchLink: "http://localhost:3000/",
  pathComplement: "/home/"
};

export default SelectPage;
