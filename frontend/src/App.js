import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from './SearchButton/SearchButton';
import { Parallax } from 'react-parallax';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

class App extends Component {

	state = {
		searchString: ''
	}

	updateSearchStringHandler = (event) => {
		this.setState({searchString: event.target.value})
	}

	updatePageLinkHandler = (event) => {
		console.log('To do.')
	}

	render() {
		return (
		<div className="App">
		<CssBaseline />
			<Parallax 
				bgImage={this.props.backgroundImage}
				blur={{min: 1, max:2}}>

				<p style={{
					fontSize: '6vw', 
					color: 'white',
					backgroundColor: 'rgba( 55, 55, 55, 0.55 )',
				}}> Entretenibit </p>

				<div style={{
						lineHeight: '40vh',
						display: 'inline', 
						margin: 'auto',
					}} >

					<SearchBar 
						onChange={this.updateSearchStringHandler}
						onEnter={this.updatePageLinkHandler}
						value={this.state.searchString}
						textStyle={{
							margin: 'auto', 
							width: '50vw',
					}} />

					<SearchButton searchLink={
						this.props.pathComplement + 
						this.state.searchString}/>
				</div>
			</Parallax>
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

export default App;
