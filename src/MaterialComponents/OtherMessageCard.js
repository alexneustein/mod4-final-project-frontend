import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const styles = {
  card: {
    'text-align': 'left'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const themeYou = createMuiTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#ff9100' },
  },
});

function MessageCard(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={themeYou}>
    <Card className={classes.card}>
      <CardContent>
        {
          props.user.username === props.currentUser.username ?
          <Typography className={classes.title} color="primary">
            {props.user.username}
          </Typography>
          :
          <Typography className={classes.title} color="secondary">
            {props.user.username}
          </Typography>
        }
        <Typography component="p">
          {props.message}
        </Typography>
      </CardContent>
    </Card>
  </MuiThemeProvider>
  );
}

MessageCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageCard);
