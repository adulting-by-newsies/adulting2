import React from 'react';
import newsie from '../../assets/images/icon.png'
import notSaved from './icon-missing-saved.png'
import CardSave from '../Homepage/CardSave.js';
import IconButton from '@material-ui/core/IconButton';
import OpenInNew from '@material-ui/icons/OpenInNew';

import {
  postRegister, postLogin, postLogout, getUser, putUser, putUserPassword, getArticleByCategory, getAllArticlesByCategory
} from '../../utils/api';

const styles = {
  bucket: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
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
      console.log(this.state.userLocal.savedArticles)
    })
  }


  render() {
    return (
      <div className="welcome-page">
        <div className="section">
          <div className="container">
            <h1 className="title is-1"style={{marginBottom: 50}}>
              Saved Articles Page for {this.state.userLocal.username}
            </h1>
              { this.state.userLocal.savedArticles ?
                this.state.userLocal.savedArticles.reverse().map(article => {
                  return (
                    <div key={article._id} style={{marginBottom: 40, position: 'relative'}}>
                      <h3 className="title is-3" style={{fontFamily: 'Permanent Marker',}}>
                        {article.title}
                      </h3>
                      <div style={{position: 'relative', marginBottom: 20,}}>
                        <img src={article.urlToImage} width="40%" height="40%"/>
                        <div style={{position: 'absolute', top: '45%', left: '40%', backgroundColor: '#ff6666', fontFamily: 'Permanent Marker'}}>
                          <a href={article.url}>
                            <h2 className="title is-2">
                              View This Article
                            </h2>
                          </a>
                        </div>
                      </div>
                      <div style={{height: '5px', backgroundColor: '#6f9be2', marginTop: 40}}>
                      </div>
                    </div>
                    )
                }) : 
                (
                  <li>
                    <div>
                      <img  src={notSaved}
                      style={{
                        width: 300,
                        height: 300,}}
                      />
                    </div>
                  </li>
                )
              }
          </div>
        </div>
      </div>
    );
  }
}
