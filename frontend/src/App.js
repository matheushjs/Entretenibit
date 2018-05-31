import React, { Component } from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchButton from "./SearchButton/SearchButton";
import { Parallax } from "react-parallax";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";
import "./App.css";
import SelectPage from "./SelectPage/SelectPage";
import Header from "./Header/Header";

class App extends Component {

	state = {
		searchString: "",
		searchEvent: false,
	}

	updateSearchStringHandler = ( event ) => {
		this.setState( { searchString: event.target.value } );
	}

	turnOnPageLinkHandler = ( event ) => {
		this.setState( { searchEvent: true } );
	}

	turnOffPageLinkHandler = ( event ) => {
		this.setState( { searchEvent: false } );
	}

	render() {
		return (
		<div className="App">
			<CssBaseline />
			<Router>
				<Parallax 
					//bgImage={ this.props.backgroundImage }
					blur={ { min: 1, max:2 } }>
					<Header homeButton={this.turnOffPageLinkHandler}/>

					<h1 
						style={ {
						fontSize: "6vw", 
						color: "white",
						backgroundColor: "rgba( 55, 55, 55, 0.55 )",
						} }> Entretenibit </h1>

					<Route 
						path="/" 
						strict={true} 
						exact={true} 
						render={ () => {
							return ( <Redirect to="/home" /> ) ;
						} } />

					<Route 
						path="/home" 
						exact={true} 
						render={ () => {
							return (
								this.state.searchEvent ? 
								<Redirect
										to={
										this.props.pathComplement + 
										this.state.searchString
										} />
								: <div 
										style={ {
										lineHeight: "40vh",
										display: "inline", 
										margin: "auto",
										} }>

									<SearchBar 
										onChange={ this.updateSearchStringHandler }
										onEnter={ this.turnOnPageLinkHandler }
										value={ this.state.searchString }
										textStyle={ {
											margin: "auto", 
											width: "50vw",
										} } />

									<Link 
										to={
										this.props.pathComplement + 
										this.state.searchString
										} >
										<SearchButton 
											onClick={ this.turnOnPageLinkHandler }/>
									</Link>
								</div>
							); }} />

					<Route path="/search" component={SelectPage} />

					<Route 
						path={this.props.pathComplement + ":searchString"}
						exact={true} 
						render={ ({match}) => {
							return (
								<div> 
									<h1> {match.params.searchString} </h1> 
									<p> 
										This will be used in future to 
										facilitate the   mechanism 
									</p>
								</div>
							);
						} } />
					
					<div>
						<Link to="/home">Home</Link>
					</div>
					<div>
						<Link to="/search">Search</Link>
					</div>
					
				</Parallax>
			</Router>
		</div>
		);
	}
}

App.defaultProps = {
	backgroundImage: 
		"https://images.pexels.com/photos/34650"+
		"/pexels-photo.jpg?"+
		"auto=compress&"+
		"cs=tinysrgb&"+
		"h=650&w=940",
	searchLink: "http://localhost:3000/",
	pathComplement: "/search/",
}

export default (App);
