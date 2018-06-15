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
  //select page (the main/parent page of this script)
  constructor(props) {
    super(props);
    this.state = {
      configurationEventType: "Select",
      searchString: "",
      actualSearchString: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    //|v| verify type (put other types here too)
    //[in this case verify target.value and checkbox.checked] |v|
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  turnOnPageLinkHandler = event => {
    //this.cleanSearchStringHandler();
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
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "5%" }}
        >
          <ConfigurationSettingsPanel
            triggerParentHandleInputChange={this.handleInputChange}
            getParentConfigurationEventType={this.state.configurationEventType}
          />
        </div>

        <div
          className="CardsSection"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
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
