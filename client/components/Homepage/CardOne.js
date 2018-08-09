import React from 'react';
import PropTypes from 'prop-types';
import ArticleCommentPane from './ArticleCommentPane';
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
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Comment from '@material-ui/icons/Comment';
import Refresh from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import missing from '../pages/icon-missing-image.png';
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';

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
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

class CardOne extends React.Component {
  
  state = { 
    expanded: false ,
    articleList: [],
    userFavorites: [],
    count: 0,
    window: window,
    expanded: false,
    comment: ""
  };

  //Runs through the users saved articles and attaches a isFavorited value of true if it
  //has already been favorited
  tellIfFavorited(article){
    if (this.state.userFavorites === [])
      return false;

    this.state.userFavorites.forEach(savedArticle => {
      if (savedArticle._id == article._id){

        return true;
      }
    })
    return false;
  }

  addFavoriteField(){
    if (this.state.articleList.length === 0){
      return
    } else{
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
    if (this.state.userFavorites) {
      this.state.userFavorites.forEach(article => {
      })
    }
  }

  componentDidMount(){
    // this.addFavoriteField();
  }

  componentWillReceiveProps(nextProps){
    console.log("Got props")
    this.setState({ articleList: nextProps.articles, userFavorites: nextProps.usersSavedArticles })
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
    console.log('clicked')
    var url = this.state.articleList[this.state.count].url
    window.open(url, '_blank');
    this.props.updateProgress();
  }

  handleCommentChange = event => {
    this.setState({comment: event.target.value})
  }

  resetForm() {
    this.setState({comment: ""})
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
          <Card className={classes.card} style={{fontFamily: 'Permanent Marker'}}>
            <CardHeader
              title={this.state.articleList.length > 0 ? this.state.articleList[this.state.count].category.toUpperCase() : ''}
            />
            <CardMedia
              className={classes.media}
              image={this.state.articleList.length > 0 ? (this.state.articleList[this.state.count].urlToImage !== null ? this.state.articleList[this.state.count].urlToImage : missing)  : ''}
              onClick={this.openInNewTab}
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
                <Comment onClick={() => this.handleExpandClick()}/>
              </IconButton>
              <IconButton aria-label="refresh">
                <Refresh onClick={this.incrementCount}/>
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <ArticleCommentPane article={this.state.articleList[this.state.count]}/>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="full-width"
                  label="User Comment"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Add Your Comment"
                  helperText="Say something insightful!"
                  fullWidth
                  margin="normal"
                  value={this.state.comment}
                  onChange={this.handleCommentChange}
                />
              </form>
              <Button className={classes.button} onClick={() => {this.props.saveUserComment(this.state.articleList[this.state.count], this.state.comment); this.resetForm();}}>
                Submit
              </Button>
            </CardContent>
            </Collapse>
          </Card>
        </div>
      </Grid>
    );
  }
}

CardOne.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardOne);
