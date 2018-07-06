import React from "react";
import ConfigurationSettingsPanel from "../SelectPage/ConfigSettings/ConfigurationSettingsPanel";
import SearchBar from "../SelectPage/SearchBar/SearchBar";
import LabelButtons from "./LabelButtons/LabelButtons";
import Typography from "@material-ui/core/Typography";

function SignUpPage(props) {
  //const { classes } = props;
  
    return (
      <div style={{ marginBottom: "5vh" }}>

        <div
          className="UserStringSection"
          style={{
            marginTop: "0vh",
            marginLeft: "5%",
            marginRight: "5%", 
            textAlign: "left" 
          }}
        >

          <Typography
            style={{
              fontSize: "2.2vw",
              textAlign: "left",
              fontFamily: "Kalam",
              color: "#D0E5FF",
              textShadow: "0.75px 0.75px 7.5px #000000"
            }}
          >
            <b>Como deseja receber nossos emails?</b>
          </Typography>

        </div>
        
        <div
          className="UserEmailSection"
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "5%", textAlign: "left" }} 
        >

          <p style={{
              fontSize: "2vw",
              textAlign: "left",
              fontFamily: "Kalam",
              color: "#D0E5FF",
              textShadow: "0.75px 0.75px 7.5px #000000",
              display: "inline"
            }}
          >Email: &emsp;
          </p>
          
          <SearchBar
            onChange={props.handleInputChange}
            onEnter={null}
            getValue={props.email}
            textStyle={{
              margin: "auto",
              width: "50vw"
            }}
            placeHolder={"Digite seu email"}
            getName={"email"}
          />

        </div>
        
        <div
          className="UserNameSection"
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "5%", textAlign: "left" }} 
        >

          <p style={{
              fontSize: "2vw",
              textAlign: "left",
              fontFamily: "Kalam",
              color: "#D0E5FF",
              textShadow: "0.75px 0.75px 7.5px #000000",
              display: "inline"
            }}
          >Nome: &emsp;
          </p>
          
          <SearchBar
            onChange={props.handleInputChange}
            onEnter={null}
            getValue={props.name}
            textStyle={{
              margin: "auto",
              width: "50vw"
            }}
            placeHolder={"Digite seu nome"}
            getName={"name"}
          />

        </div>

        <div
          className="ConfigurationSection"
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "7.75%" }} >
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
          className="KeyWordsSection"
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "5%", textAlign: "left" }} >

          <p style={{
              fontSize: "2vw",
              textAlign: "left",
              fontFamily: "Kalam",
              color: "#D0E5FF",
              textShadow: "0.75px 0.75px 7.5px #000000",
              display: "inline"
            }}
          >Busca: &emsp;
          </p>

          <SearchBar
            onChange={props.handleInputChange}
            onEnter={null}
            getValue={props.searchString}
            textStyle={{
              margin: "auto",
              width: "50vw"
            }}
            placeHolder={"O que você procura?"}
            getName={"searchString"}
          />

        </div>

        <div
          className="SignUpButtonSection"
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "5%"}} >

          <LabelButtons
            onClick={props.handleSignUpButton}
            getText={"Cadastrar-se"}/>

        </div>

      </div>
    );
}

export default SignUpPage;
