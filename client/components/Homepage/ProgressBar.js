import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class ProgressBar extends React.Component {
  state = {
    completed: 0,
    numArticles: 0,
  };


  componentWillReceiveProps(newProps){
    this.setState({numArticles: newProps})
  }

  progress = () => {
    const { completed, numArticles } = this.state;
    if (completed === 100) {
      return;
    } else {
      this.setState({ completed: 25+numArticles });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={this.state.completed} />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgressBar);