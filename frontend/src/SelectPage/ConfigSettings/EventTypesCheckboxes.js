import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class EventTypesCheckboxes extends React.Component {
  state = {
    academic: true,
    music: false,
    theater: true,
	others: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipos de Eventos</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.academic}
                onChange={this.handleChange("academic")}
				name="academic"
                value="academic"
              />
            }
            label="Academico"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.music}
                onChange={this.handleChange("music")}
                name="music"
				value="music"
              />
            }
            label="Musica"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.theater}
                onChange={this.handleChange("theater")}
                name="theater"
				value="theater"
              />
            }
            label="Teatro"
          />
		  <FormControlLabel
            control={
              <Checkbox
                checked={this.state.others}
                onChange={this.handleChange("others")}
                name="others"
				value="others"
              />
            }
            label="Outros"
          />
        </FormGroup>
      </FormControl>
    );
  }
}

export default EventTypesCheckboxes;
