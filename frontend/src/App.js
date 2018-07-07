import React, { Component } from "react";
import { Parallax } from "react-parallax";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import SelectPage from "./SelectPage/SelectPage";
import AboutUsPage from "./AboutUsPage/AboutUsPage";
import Header from "./Header/Header";
import SignUpPage from "./SignUpPage/SignUpPage";
import { insertUser } from "./api/server";
import SweetAlert from "sweetalert2-react";

class App extends Component {
  //constructor(props) {
  //  super(props);
  //  this.selectPageChild = React.createRef(); ref={this.selectPageChild}
  //}
  
  state = {
    configurationEventType: "Select",
    searchString: "",
    actualSearchString: "",
    nome: "",
    email: "",
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
    cards: [],
    alertShow: false,
    alertTitle: "",
    alertText: ""
  };

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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  turnOnPageLinkHandler = (event) => {
    this.setState({
      actualSearchString: this.state.searchString
    });
  };
  
  onChangePage = () => {
    this.setState({
      configurationEventType: "Select",
      searchString: "",
      actualSearchString: "",
      name: "",
      email: "",
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
      cards: [],
	});
  //this.selectPageChild.current.cleanSearchStringHandler();
  //window.location.reload();
  }
  
  redirectOnSend = () => { //for tests -> get the current path
    alert(window.location.pathname);
  }

  handleSignUpButton = (event) => {
    insertUser(
      this.state.email,
      this.state.name,
      this.state.searchString,
      this.state.checkBoxes,
      this.state.price,
      this.state.date
    )
    .then(res => {
      this.setState({
        alertShow: true,
        alertTitle: "Usuário cadastrado com sucesso!",
        alertText: "",
      });
    })
    .catch(err => {
      this.setState({
        alertShow: true,
        alertTitle: "Cadastro não realizado :(",
        alertText: "Sentimos muito! Não foi possível cadastrá-lo no sistema.\n" +
          "Possivelmente o e-mail utilizado já está cadastrado.",
      });
    });
  };

  render() {
    return (
      <div className="App">
        <link href='https://fonts.googleapis.com/css?family=Kalam' rel='stylesheet'/>
        <CssBaseline />
        <SweetAlert
          show={this.state.alertShow}
          title={this.state.alertTitle}
          text={this.state.alertText}
          onConfirm={() => this.setState({ alertShow: false })}
        />
        <Router>
          <Parallax
            bgImage={ this.props.backgroundImage }
            blur={{ min: 0.5, max: 1 }}
          >
            <Header
              homeButton={this.onChangePage}
              aboutUsButton={this.onChangePage}
              signUpButton={this.onChangePage}
            />

            <h1
              style={{
                fontSize: "6vw",
                fontFamily: "Kalam",
                color: "#3F7BC8",
                textShadow: "1px 1px 1px #000000"
              }}
            >
              {" "}
              Entretenibit{" "}
            </h1>

            <Route
              path="/"
              strict={true}
              exact={true}
              render={() => {
                return <Redirect to="/home/" />;
              }}
            />

            <Route
              path="/(home|search)/"
              render={() => {
                return (
                  <SelectPage 
                    date={this.state.date}
                    price={this.state.price}
                    checkBoxes={this.state.checkBoxes}
                    cards={this.state.cards} 
                    actualSearchString={this.state.actualSearchString}
                    searchString={this.state.searchString}
                    configurationEventType={this.state.configurationEventType}
                    handleInputChange={this.handleInputChange}
                    handleStateParameters={this.handleStateParameters}
                    turnOnPageLinkHandler={this.turnOnPageLinkHandler}
                  />
                );
              }}
            />

            <Route
              path="/aboutus/"
              render={() => {
                return <AboutUsPage />;
              }}
            />
            
            <Route
              path="/signup/"
              render={() => {
                return <SignUpPage 
                  date={this.state.date}
                  price={this.state.price}
                  checkBoxes={this.state.checkBoxes}
                  name={this.state.name}
                  email={this.state.email}
                  searchString={this.state.searchString}
                  configurationEventType={this.state.configurationEventType}
                  handleInputChange={this.handleInputChange}
                  handleStateParameters={this.handleStateParameters}
                  turnOnPageLinkHandler={this.turnOnPageLinkHandler}
                  handleSignUpButton={this.handleSignUpButton}
                />;
              }}
            />

          </Parallax>
        </Router>
      </div>
    );
  }
}

App.defaultProps = {
  backgroundImage:
    "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
  searchLink: "http://localhost:3000/",
  pathComplement: "/home/"
};
//https://images.pexels.com/photos/34650/pexels-photo.jpg

export default App;
