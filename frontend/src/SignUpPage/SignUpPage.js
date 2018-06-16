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
          className="UserSection"
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
            <b>Como deseja receber nossos emails?</b>
          </Typography>
              
          <p style={{
              fontSize: "1.5vw",
              textAlign: "left"
            }}
          >Email: &emsp;
          
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
          </p>
          
          <p style={{
              fontSize: "1.5vw",
              textAlign: "left"
            }}
          >Nome: &emsp;
          
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
          </p>
          
          
          
        </div>

        <div
          className="ConfigurationSection"
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "5%" }} >
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
          style={{ marginTop: "3vh", marginLeft: "5%", marginRight: "5%" }} >
          
          <p style={{
              fontSize: "1.5vw",
              textAlign: "left"
            }}
          >Busca: &emsp;
          
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
          </p>

          <LabelButtons 
            onClick={null}
            getText={"Cadastrar-se"}/>
          
        </div>

      </div>
    );
}

export default SignUpPage;
