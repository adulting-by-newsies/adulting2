import React from 'react';
import { getArticleById } from '../../utils/api';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  Typography: {
    textAlign: 'left',
  }
})

class ArticleCommentPane extends React.Component {

  state = {
    articleLocal: {},
    commentsArray: []
  }

  displayState() {
    if (this.state.articleLocal.comments){
      console.log(this.state.articleLocal.comments)
    }
    // console.log(this.state)
  }

  componentDidMount() {
    this.setState({articleLocal: this.props.article})
  }

  componentDidUpdate(){
    this.displayState();
  }

  render() {
    return (
      <div>
        {this.props.article.comments ? 
          this.props.article.comments.map(function(comment,i) {
            return (
              <div key={i}>
                <Typography variant="title" gutterBottom style={{textAlign: 'left'}}>
                  {comment.user}
                </Typography>
                <Typography variant="body2" gutterBottom style={{textAlign: 'left'}}>
                  {comment.comment}
                </Typography>
              </div>
            )
          })

          :
           (
            <div>
              No comments for this article...
            </div>
            )
        }
      </div>
    )
  }
  
}

export default ArticleCommentPane