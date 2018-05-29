import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FileUpload from '@material-ui/icons/FileUpload';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Save from '@material-ui/icons/Save';

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <div style={props.buttonStyle}>
      <Button 
	style={{display: 'inline-block'}}
	className={classes.button} 
	variant="raised"
	color="primary">
        <Icon className={classes.rightIcon}>Enviar</Icon>
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);
