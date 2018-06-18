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
      alert("Usuário cadastrado com sucesso!");
    })
    .catch(err => {
      alert(
        "Sentimos muito! Não foi possível cadastrá-lo no sistema.\n" +
        "Possivelmente o e-mail utilizado já está cadastrado."
      );
      
      if(err.response){
        console.log(err.response.data);
      } else if (err.request){
        console.log(err.request);
      } else {
        console.log(err.message);
      }
      console.log(err.config);
    });
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Router>
          <Parallax
            //bgImage={ this.props.backgroundImage }
            blur={{ min: 1, max: 2 }}
          >
            <Header
              homeButton={this.onChangePage}
              aboutUsButton={this.onChangePage}
              signUpButton={this.onChangePage}
            />

            <h1
              style={{
                fontSize: "6vw",
                color: "white",
                backgroundColor: "rgba( 55, 55, 55, 0.55 )"
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
    "https://images.pexels.com/photos/34650" +
    "/pexels-photo.jpg?" +
    "auto=compress&" +
    "cs=tinysrgb&" +
    "h=650&w=940",
  searchLink: "http://localhost:3000/",
  pathComplement: "/home/"
};

export default App;
