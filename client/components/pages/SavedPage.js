import React from 'react';
import newsie from '../../assets/images/icon.png'
import notSaved from './icon-missing-saved.png'

import {
  postRegister, postLogin, postLogout, getUser, putUser, putUserPassword, getArticleByCategory, getAllArticlesByCategory
} from '../../utils/api';

const styles = {
  center: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  ul: {
    listStyleType: "none"
  }
}

export default class SavedPage extends React.Component {

  state = {
    userLocal: false
  }


  componentDidMount() {
    getUser().then(data => {
      this.setState({userLocal: data.user})
    })
  }

  render() {
    return (
      <div className="welcome-page">
        <div className="section">
          <div className="container">
            <h1 className="title is-1">
              Saved Articles Page for {this.state.userLocal.username}
            </h1>
            <ul>
              { this.state.userLocal.savedArticles ?
                this.state.userLocal.savedArticles.map(article => {
                  return (
                    <li key={article._id}>
                      <div className={styles.center}>
                        <a href={article.url}>{article.title}</a>
                      </div>
                    </li>
                    )
                }) : 
                (
                  <li>
                    <div className={styles.center}>
                      <img  src={notSaved}
                      style={{
                        width: 300,
                        height: 300,}}
                      />
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
