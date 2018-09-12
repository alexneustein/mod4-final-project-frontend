import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from './Button'

class TopicSelect extends React.Component {

  render() {
    // console.log(this.props.topics)
    return (
      <div>
        <Dialog
          open={this.props.open}
          // onClose={this.props.topicClickClosed}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Choose Your Topic!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {this.props.topics.map(topic => {
            return  <MyButton key={topic.id} buttonText={topic.name} onClick={() => this.props.topicClickClosed(topic.id)} color="default" autoFocus />
            })}
            {/* <Button onClick={this.props.topicClickClosed} color="primary">
              Disagree
            </Button>
            <Button onClick={this.props.topicClickClosed} color="primary" autoFocus>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default TopicSelect;
