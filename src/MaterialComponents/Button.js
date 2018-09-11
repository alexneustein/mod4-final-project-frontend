import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#ff9100' }
    // default: { main: '#673ab7' }
    // pentary: { main: '#ffea00' }
  },
});

function MyButton(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <Button onClick={props.onClick} variant="extendedFab" color={props.color} className={classes.button}> {props.buttonText} </Button>
    </MuiThemeProvider>
  );
}

MyButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyButton);
