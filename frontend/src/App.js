import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from './SearchButton/SearchButton';
import { Parallax } from 'react-parallax';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
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
		/* Note: This background color was added to prevent
		 * the background to not have enough contrast with
		 * the title, making difficult to read it.
		 */
		backgroundColor: 'rgba(75,75,75,0.75)',
		}}> Entretenibit </p>

	  <SearchBar 
	  	textStyle={{
	  		margin: 'auto', 
	  		width: '50vw',
			textAlign: 'auto',
		}}
	  	divStyle={{
	  		lineHeight: '40vh',
	  		display: 'inline', 
	  		padding: '3px', 
	  		margin: 'auto',
			}} />
          <SearchButton 
	  	buttonStyle={{
	  		lineHeight: '40vh',
	  		display: 'inline', 
	  		padding: '3px', 
	  		margin: 'auto', 
			}} />

	/* Note: the highlighted events component must
         * be placed right here, according to the
         * main page planning.
         */

        </Parallax>
      </div>
    );
  }
}

App.defaultProps = {
  backgroundImage: 'https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940'
}

export default App;
