import React from 'react';
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function TopNavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.currentUser.username ?
            <Typography variant="title" color='inherit'>
              {props.currentUser.username}
            </Typography>
            : ''}
          <Typography variant="title" color="inherit" className={classes.grow}>
            Pic-Char-Boo
          </Typography>
          {props.loggedIn ?
            <Button color="inherit" onClick={() => props.logOut()}>Log Out</Button>
          : <p>Game on!</p>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNavBar);
