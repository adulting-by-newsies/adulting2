import React from 'react';
import { getArticleById } from '../../utils/api';

class ArticleCommentPane extends React.Component {

  state = {
    articleLocal: {},
  }

  displayState() {
    console.log(this.state)
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
          })
            (
            <li key={comment._id}>
              <div>
                User {i} says
              </div>
              <div>
                comment
              </div>
            </li>
            )
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