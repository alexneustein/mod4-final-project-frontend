import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// import InputField from './InputField'
// import MyButton from './Button'

const styles = {
  card: {
    align: 'center',
    minWidth: 275,
    maxWidth: 750
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function LoginCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        {props.inputUser()}
        {props.inputPassword()}
      </CardContent>
      <CardActions>
        {props.loginButton()}
        {props.signupButton()}
      </CardActions>
    </Card>
  );
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginCard);
