import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from './SearchButton/SearchButton';
import { Parallax } from 'react-parallax';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import './App.css';

class App extends Component {

	state = {
		searchString: '',
	}

	updateSearchStringHandler = ( event ) => {
		this.setState( { searchString: event.target.value } )
	}

	updatePageLinkHandler = ( event ) => {
		console.log('To do.')
	}

	render() {
		return (
		<div className="App">
			<CssBaseline />
			<Router>
				<Parallax 
					bgImage={ this.props.backgroundImage }
					blur={ { min: 1, max:2 } }>

					<h1 
						style={ {
						fontSize: '6vw', 
						color: 'white',
						backgroundColor: 'rgba( 55, 55, 55, 0.55 )',
						} }> Entretenibit </h1>

					<Route path='/home' exact={true} render={ () => {
						return (
							<div 
									style={ {
									lineHeight: '40vh',
									display: 'inline', 
									margin: 'auto',
									} }>

								<SearchBar 
									onChange={ this.updateSearchStringHandler }
									onEnter={ this.updatePageLinkHandler }
									value={ this.state.searchString }
									textStyle={ {
										margin: 'auto', 
										width: '50vw',
									} } />

								<SearchButton 
									onClick={ this.updatePageLinkHandler }/>
							</div>
						)}} />

					<Route 
						path='/search/:searchString' 
						exact={true} 
						render={ ({match}) => {
							return (
								<div> 
									<h1> {match.params.searchString} </h1> 
									<p> 
										This will be used in future to 
										facilitate the search mechanism 
									</p>
								</div>
							);
						} } />

					<Route
						path='/aboutus'
						exact={true}
						render={ () => {
							return (
								<div> 
									<p> 
										This will be used in future to 
										facilitate the 'About us' display 
									</p>
								</div>
							);
						} } />

				</Parallax>
			</Router>
		</div>
		);
	}
}

App.defaultProps = {
	backgroundImage: 
		'https://images.pexels.com/photos/34650'+
		'/pexels-photo.jpg?'+
		'auto=compress&'+
		'cs=tinysrgb&'+
		'h=650&w=940',
	searchLink: 'http://localhost:3000/',
	pathComplement: '',
}

export default (App);
