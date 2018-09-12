import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class LinearDeterminate extends React.Component {
  timer = null;

  state = {
    completed: 0,
    color: 'primary'
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 120);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed >= 75){
      this.setState({color: 'secondary'})
    }
    if (completed >= 100) {
      this.props.endGame()
      this.setState({ completed: 0 });
    } else {
      this.setState({ completed: completed + 0.1 });
    }
  };

  render() {
    return (
        <LinearProgress color={this.state.color} variant="determinate" value={this.state.completed} />
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearDeterminate);
