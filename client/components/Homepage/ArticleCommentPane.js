import React from 'react';
import { getArticleById } from '../../utils/api';

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
    this.setState({articleLocal: this.props.article}, this.displayState())
    // console.log("Getting article " + this.props.article._id)
    // getArticleById(this.props.article._id).then(data => {
    //   // console.log("Got article " + data.article)
    //   console.log("Title: " + data.title);
    //   this.setState({articleLocal: data}, this.displayState())
    // })
  }

  componentDidUpdate(){
    this.displayState();
  }

  render() {
    return (
      <div>
        {this.props.article.comments ? 
          this.props.article.comments.map(function(comment,i) {
            console.log(comment)
            return (
            <li key={i}>
              <div>
                User {comment.user} says
              </div>
              <div>
                {comment.comment}
              </div>
            </li>
            )
          })

          :
           (
            <div>
              No comments for {this.props.article ? this.props.article.title : {}}
            </div>
            )
        }
      </div>
    )
  }
  
}

export default ArticleCommentPane