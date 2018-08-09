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

class CardSave extends React.Component {
  
  state = { 
    expanded: false ,
    articleList: [],
    userFavorites: [],
    count: 0,
    window: window,
  };

  componentDidMount(){
    console.log("Mounted")
    // this.addFavoriteField();
  }

  componentDidUpdate(){
  }

  componentWillReceiveProps(nextProps){
    console.log("Got props")
    console.log(nextProps)
    this.setState({ articleList: nextProps.articles})
  }

  openInNewTab = () => {
    var url = this.state.articleList[this.state.count].url
    window.open(url, '_blank');
  }

  render() {
    const { classes } = this.props;
    console.log("Rendering CardSave")
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
              title="Placeholder"
                          />
            <CardMedia
              className={classes.media}
              title="Contemplative Reptile"
              onClick={this.openInNewTab}
            />
            <CardContent>
              <Typography component="p">
                "Placeholder"
              </Typography>
            </CardContent>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            </Collapse>
          </Card>
        </div>
      </Grid>
    );
  }
}

CardSave.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardSave);
