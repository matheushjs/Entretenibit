import React from "react";
import CardGrid from "../CardGrid/CardGrid";
import ConfigurationSettingsPanel from "./ConfigSettings/ConfigurationSettingsPanel";
import SearchBar from "./SearchBar/SearchBar";
import SearchButton from "./SearchButton/SearchButton";
import LabelButtons from "../SignUpPage/LabelButtons/LabelButtons";

import {
  Route,
  Redirect,
  Link
} from "react-router-dom";

function SelectPage(props) {
  //const { classes } = props;

    return (
      <div>
        <div className="SearchBarSection"
          style={{
            lineHeight: "3vh",
            display: "inline",
            margin: "auto"
          }} >
          <SearchBar
            onChange={props.handleInputChange}
            onEnter={props.turnOnPageLinkHandler}
            getValue={props.searchString}
            textStyle={{
              margin: "auto",
              width: "50vw"
            }}
            placeHolder={"O que você procura?"}
            getName={"searchString"}
          />

          <SearchButton onClick={props.turnOnPageLinkHandler}/>


          <Route
            path="/(home|search)/"
            render={() => {
              return (
                <Redirect
                  to={"/home/" + props.actualSearchString}
                />
              ); 
            }}
          />

        </div>

        <div
          className="ConfigurationSection"
          style={{margin: "0.5% 20% 6% 20%"}} >
          <ConfigurationSettingsPanel
            triggerParentHandleInputChange={props.handleInputChange}
            getParentConfigurationEventType={props.configurationEventType}
            date={props.date}
            price={props.price}
            changeHandler={props.handleStateParameters}
            checkBoxes={props.checkBoxes}
          />
        </div>

        <div
          className="CardsSection"
          style={{ marginTop: 20, marginBottom: 20 }} >

          <CardGrid 
            cards={props.cards} 
            date={props.date}
            price={props.price}
            title={props.actualSearchString}
            type={props.checkBoxes} />
        </div>

      </div>
    );
}

export default SelectPage;
