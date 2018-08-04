import React, {Component} from 'react';
import CardOne from '../Homepage/CardOne.js';
import CardTwo from '../Homepage/CardTwo.js';
import CardThree from '../Homepage/CardThree.js';
import CardFour from '../Homepage/CardFour.js';
import CardFive from '../Homepage/CardFive.js';
import ProgressBar from '../Homepage/ProgressBar.js';

import {
  postRegister, postLogin, postLogout, getUser, putUser, putUserPassword, getArticleByCategory, getAllArticlesByCategory
} from '../../utils/api';

export default class HomePage extends Component {

  state = {
    userArticleList: [],
    userPreferences: [],
    username: "",
    userLocal: 'false'
  }

  componentDidMount() {
    getUser().then(data => {
      // console.log("User is ");
      // console.log(data.user);

      //TODO: Can we just get away with a local copy of the user?
      console.log("Show local user")
      this.setState({userLocal: data.user}, console.log(this.state.userLocal));

      var arr = data.user.preferences.map(x => x.toLowerCase())

      this.setState({username: data.user.username, userPreferences: arr});
      if (data.user.preferences.length === 0){
        //TODO: Write some code to build out a default homepage
        getAllArticlesByCategory("sports").then(article => {
          console.log(article);
        })
      } else {
        //TODO: Handle all the cases to build out the article list
        // with the preferences given here
        let promises = this.state.userPreferences.map(element => {
          let promise = element ? (
            new Promise(function(resolve, reject){
              getAllArticlesByCategory(element).then(article => {
                resolve(article);
              })
            })
          ) : null;

          return promise
        })

        Promise.all(promises).then(results => {
            console.log("This is the state ===>", this.state)
            this.setState({userArticleList: results}, this.displayState)
          }
        )
        
      }
    })
  }


  returnArticles(num){
    return this.state.userArticleList[num]
  }

  displayState(){
    console.log('displaying state: ', this.state.userArticleList[0])
  }

  //This function will push userLocal back to the user Database
  updateUserToDatabase() {
    putUser(this.state.userLocal);
  }

  saveArticle(article){
    console.log("trying to save article")
    console.log(article);
    console.log(this.state.userLocal)
    // this.setState({userLocal.savedArticles})
    //This is a waste of memory, there must be a better way...
    // this.displayState();
    var tempUser = {}
    var alreadySaved = false;
    tempUser = this.state.userLocal;

    tempUser.savedArticles.forEach(savedArticle => {
      if(savedArticle._id === article._id){
        console.log("Already saved this article");
        alreadySaved = true;
      }
    })
    if (!alreadySaved){    
      tempUser.savedArticles.push(article);
      this.setState({userLocal: tempUser}, this.updateUserToDatabase)
    }
  }

  render() {
    console.log('RENDERING--------------------------------')
    return (
      <div className="home-page">
        <div className="section">
          <div className="container">
            <div className="container" style={{ position: 'absolute', top: 10, right: -10, width: 120 }}>
              <h6 className="title is-6">
                Daily Progress
              </h6>
              <ProgressBar />
            </div>
            <h2 className="title is-2" style={{ marginTop: 50 }}>
              Welcome to your personalized article feed, {this.state.username}!

            </h2>
            {this.state.userPreferences[0] ? <CardOne articles={this.state.userArticleList[0]} saveArticle={this.saveArticle.bind(this)}/> : null}
            {this.state.userPreferences[1] ? <CardOne articles={this.state.userArticleList[1]} saveArticle={this.saveArticle.bind(this)}/> : null}
            {this.state.userPreferences[2] ? <CardOne articles={this.state.userArticleList[2]} saveArticle={this.saveArticle.bind(this)}/> : null}
            {this.state.userPreferences[3] ? <CardOne articles={this.state.userArticleList[3]} saveArticle={this.saveArticle.bind(this)}/> : null}
            {this.state.userPreferences[4] ? <CardOne articles={this.state.userArticleList[4]} saveArticle={this.saveArticle.bind(this)}/> : null}

          </div>
        </div>
      </div>
    );
  }
  /*
            <CardTwo />
            <CardThree />
            <CardFour />
            <CardFive />
  */
}
