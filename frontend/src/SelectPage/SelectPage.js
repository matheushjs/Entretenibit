import React from "react";
import CardGrid from "../CardGrid/CardGrid";
import ConfigurationSettingsPanel from "./ConfigSettings/ConfigurationSettingsPanel";

class SelectPage extends React.Component{ 
	//select page (the main/parent page of this script)
	constructor(props){
		super(props);
		this.state = {
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
				<div className = "ConfigurationSection" style={{marginTop: "3vh", marginLeft: "5%", marginRight: "5%"}}>
					<ConfigurationSettingsPanel 
					triggerParentHandleInputChange={this.handleInputChange}
					getParentConfigurationEventType={this.state.configurationEventType}/>
				</div>
				<div className = "CardsSection" style={{marginTop: 20, marginBottom: 20}}>
					<CardGrid />
				</div>
				<div>
					<b>Just a test (use this props in the future): {this.props.searchString}</b>
				</div>
			</div>
		);
	}
}

export default (SelectPage);
