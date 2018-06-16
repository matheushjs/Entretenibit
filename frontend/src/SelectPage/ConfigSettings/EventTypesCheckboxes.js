import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function EventTypesCheckboxes(props) {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipos de Eventos</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.checkBoxes.academic}
                onChange={props.handleChange}
                name="academic"
                value="academic"
              />
            }
            label="Academico"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.checkBoxes.music}
                onChange={props.handleChange}
                name="music"
                value="music"
              />
            }
            label="Musica"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.checkBoxes.theater}
                onChange={props.handleChange}
                name="theater"
                value="theater"
              />
            }
            label="Teatro"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.checkBoxes.others}
                onChange={props.handleChange}
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

export default EventTypesCheckboxes;
