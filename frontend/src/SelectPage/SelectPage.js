import React from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import SearchBar from "../SearchBar/SearchBar";
import SearchButton from "../SearchButton/SearchButton";
import { BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";

class ConfigurationSection extends React.Component{ 
	//configutarion settings section (the second one)
	render(){
		return (
			<div>
				<h1>Here goes the search configuration settings section.</h1>
				<InputLabel>Event Type: </InputLabel>
				<Select value={this.props.getParentConfigurationEventType} 
					onChange={this.props.triggerParentHandleInputChange} 
					inputProps={{name: "configurationEventType"}}>
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
	render(){
		return (
			<h1>Here goes the cards section.</h1>
		);
	}
}

class SelectPage extends React.Component{ 
	//select page (the main/parent page of this script)
	constructor(props){
		super(props);
		this.state = {
			searchString: "",
			searchEvent: false,

			configurationEventType: "Select",
			};
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleInputChange(event){
		const target = event.target;
		//|v| verify type (put other types here too) 
		//[in this case verify target.value and checkbox.checked] |v|
		const value = target.type === "checkbox" ? 
			target.checked : target.value;
		const name = target.name;
		
		this.setState({
			[name]: value
		});
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	render() {
		return (
			<div>
				<div className = "ConfigurationSection">
					<ConfigurationSection 
					triggerParentHandleInputChange={this.handleInputChange}
					getParentConfigurationEventType={this.state.configurationEventType}/>
				</div>
				<div className = "CardsSection">
					<CardsSection />
				</div>
				<div>
					Just a test (use this props in the future): {this.props.searchString}
				</div>
			</div>
		);
	}
}

export default (SelectPage);
