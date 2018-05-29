import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from './SearchButton/SearchButton';

class App extends Component {
  render() {
    return (
      <div className="App">
	<SearchBar 
		textStyle={{
			margin: 'auto', 
			width: '50vw'}}
		divStyle={{
			lineHeight: '75vh',
			display: 'inline', 
			padding: '3px', 
			margin: 'auto'}} />
        <SearchButton 
		buttonStyle={{
			lineHeight: '75vh',
			display: 'inline', 
			padding: '3px', 
			margin: 'auto', 
			width: '50%'}} />
      </div>
    );
  }
}

export default App;
