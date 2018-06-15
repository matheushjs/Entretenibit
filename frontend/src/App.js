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

class App extends Component {
  //constructor(props) {
  //  super(props);
  //  this.selectPageChild = React.createRef(); ref={this.selectPageChild}
  //}
  
  onChangePage = () => {
  //  this.selectPageChild.current.cleanSearchStringHandler();
    window.location.reload();
  }

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
              homeButton={null}
              aboutusButton={null}
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
		          <SelectPage />
                );
              }}
            />

            <Route
              path="/aboutUs/"
              render={() => {
                return <AboutUsPage />;
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
