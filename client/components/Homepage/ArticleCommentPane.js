import React from 'react';
import { getArticleById } from '../../utils/api';

const styles = theme => ({

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
                User {comment.user} says: {comment.comment}
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