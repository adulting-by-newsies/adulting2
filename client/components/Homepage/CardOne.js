import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Comment from '@material-ui/icons/Comment';
import Refresh from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import missing from '../pages/icon-missing-image.png';

const styles = theme => ({
  card: {
    width: 700,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class CardOne extends React.Component {
  
  state = { 
    expanded: false ,
    articleList: [],
    count: 0
  };

  componentWillReceiveProps(nextProps){
    this.setState({ articleList: nextProps.articles })
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  incrementCount = () => {
    const newCount = this.state.count < 4 ? this.state.count+1 : 0;
    this.setState({count: newCount})
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <div style={{ marginBottom: 20, marginTop: 10 }}>
          <Card className={classes.card}>
            <CardHeader
              title={this.state.articleList.length > 0 ? this.state.articleList[this.state.count].category.toUpperCase() : ''}
            />
            <CardMedia
              className={classes.media}
              image={this.state.articleList.length > 0 ? (this.state.articleList[this.state.count].urlToImage !== null ? this.state.articleList[this.state.count].urlToImage : missing)  : ''}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography component="p">
                {this.state.articleList.length > 0 ? this.state.articleList[this.state.count].description : ''}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="comment">
                <Comment />
              </IconButton>
              <IconButton aria-label="refresh">
                <Refresh onClick={this.incrementCount}/>
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            </Collapse>
          </Card>
        </div>
      </Grid>
    );
  }
}

CardOne.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardOne);