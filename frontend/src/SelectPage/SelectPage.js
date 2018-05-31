import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
//import App from "./App";
//import registerServiceWorker from "./registerServiceWorker";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
//import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class SearchBarSection extends React.Component{ //search bar section (the first one)
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<div>
				<h1>Here goes the search bar section.</h1>
				<TextField name="searchText" id="search" label="Search Here!" type="search" margin="normal" autoComplete = "off" 
					onChange={this.props.triggerParentHandleInputChange}/>
				<Button name="searchButton" variant="fab" color="primary" aria-label="search" 
					onClick={this.props.triggerParentHandleSubmit}> <SearchIcon /> </Button>
			</div>
		);
	}
}

class ConfigurationSection extends React.Component{ //configutarion settings section (the second one)
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<div>
				<h1>Here goes the search configuration settings section.</h1>
				<InputLabel>Event Type: </InputLabel>
				<Select value={this.props.getParentConfigurationEventType} 
					onChange={this.props.triggerParentHandleInputChange} inputProps={{name: "configurationEventType"}}>
						<MenuItem value="Select"> <em>Select</em> </MenuItem>
						<MenuItem value="Type1">Type 1</MenuItem>
						<MenuItem value="Type2">Type 2</MenuItem>
						<MenuItem value="Type3">Type 3</MenuItem>
				</Select>
			</div>
		);
	}
}

class CardsSection extends React.Component{ //cars section (the third one)
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<h1>Here goes the cards section.</h1>
		);
	}
}

class SelectPage extends React.Component{ //select page (the main/parent page of this script)
	constructor(props){
		super(props);
		this.state = {
			searchText: "",
			configurationEventType: "Select"
			};
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleInputChange(event){
		const target = event.target;
		//|v| verify type (put other types here too) [in this case verify target.value and checkbox.checked] |v|
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		
		this.setState({
			[name]: value
		});
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	handleSubmit(event){ //for tests
		alert("" + this.state.searchText + "\n" + this.state.configurationEventType);
		event.preventDefault();
	}
	
	render(){
		return (
			<div>
				<div className = "SearchBarSection">
					<SearchBarSection 
					triggerParentHandleInputChange={this.handleInputChange}
					triggerParentHandleSubmit={this.handleSubmit}/>
				</div>
				<div className = "ConfigurationSection">
					<ConfigurationSection 
					triggerParentHandleInputChange={this.handleInputChange}
					getParentConfigurationEventType={this.state.configurationEventType}/>
				</div>
				<div className = "CardsSection">
					<CardsSection />
				</div>
			</div>
		);
	}
}

export default (SelectPage);

//ReactDOM.render(<SelectPage />, document.getElementById("root"));
//registerServiceWorker();
