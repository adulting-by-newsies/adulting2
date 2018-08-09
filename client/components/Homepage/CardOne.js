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
import ReactDOM from 'react-dom'

import {
  getUser, putUser, putUserPassword, getArticleByCategory, getAllArticlesByCategory
} from '../../utils/api';

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
  CardHeader: {
    fontFamily: 'Permanent Marker',
  },
  FavoriteIcon: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  FavoriteIconActive: {
    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)'
  }
});

class CardOne extends React.Component {
  
  state = { 
    expanded: false ,
    articleList: [],
    userFavorites: [],
    count: 0,
    window: window,
  };

  //Runs through the users saved articles and attaches a isFavorited value of true if it
  //has already been favorited
  tellIfFavorited(article){
    if (this.state.userFavorites === [])
      return false;

    this.state.userFavorites.forEach(savedArticle => {
      console.log("Comparing ")
      console.log(savedArticle._id)
      console.log(article._id)
      if (savedArticle._id == article._id){
        console.log("It's a match")

        return true;
      }
    })
    return false;
  }

  addFavoriteField(){
    console.log("Testing if no articleList")
    if (this.state.articleList.length === 0){
      console.log("Shouldn't go any further")
      return
    } else{
      console.log(this.state.articleList)
    }

    var temp = this.state.articleList;
    if(this.tellIfFavorited(this.state.articleList[this.state.count])){
      temp[this.state.count].isFavorited = true;

    } else {
      temp[this.state.count].isFavorited = false;

    }
    this.setState({articleList: temp})
  }

  displaySaved() {
    console.log("Displaying User Saved Articles")

    if (this.state.userFavorites) {
      this.state.userFavorites.forEach(article => {
        console.log(article._id);
      })
    }
  }

  componentDidMount(){
    console.log("Mounted")
    // this.addFavoriteField();
  }

  componentWillReceiveProps(nextProps){
    console.log("Got props")
    this.setState({ articleList: nextProps.articles, userFavorites: nextProps.usersSavedArticles }, this.displaySaved)
  }

  componentDidUpdate(){

  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  incrementCount = () => {
    const newCount = this.state.count < 4 ? this.state.count+1 : 0;
    this.setState({count: newCount})
  }

  openInNewTab = () => {
    var url = this.state.articleList[this.state.count].url
    window.open(url, '_blank');
  }

  render() {
    const { classes } = this.props;
    console.log("Rendering CardOne")
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <div style={{ marginBottom: 20, marginTop: 10 }}>
          <Card className={classes.card} style={{fontFamily: 'Permanent Marker'}}>
            <CardHeader
              title={this.state.articleList.length > 0 ? this.state.articleList[this.state.count].category.toUpperCase() : ''}
            />
            <CardMedia
              className={classes.media}
              image={this.state.articleList.length > 0 ? (this.state.articleList[this.state.count].urlToImage !== null ? this.state.articleList[this.state.count].urlToImage : missing)  : ''}
              title="Contemplative Reptile"
              onClick={() => {this.openInNewTab; this.props.updateProgress;}}
            />
            <CardContent>
              <Typography component="p">
                {this.state.articleList.length > 0 ? this.state.articleList[this.state.count].description : ''}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon 
                  style={this.state.articleList.length > 0 ? (this.state.articleList[this.state.count].isFavorited ? {color: red[500]} : {}): {}}

                  onClick={() => {this.state.articleList[this.state.count].isFavorited = true; this.props.saveArticle(this.state.articleList[this.state.count]); }}
                ></FavoriteIcon>
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
