import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CardGrid from "../CardGrid/CardGrid";

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
					<CardGrid />
				</div>
				<div>
					Just a test (use this props in the future): {this.props.searchString}
				</div>
			</div>
		);
	}
}

export default (SelectPage);
