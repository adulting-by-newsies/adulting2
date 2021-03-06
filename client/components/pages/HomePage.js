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
            console.log("This is results ===>", results)
            results.forEach(articleArray => {
              articleArray.forEach(article => {
                article.isFavorited = false;
                data.user.savedArticles.forEach(savedArticle => {
                  if (savedArticle._id === article._id){
                    console.log(article);
                    article.isFavorited = true;
                  }
                })
              })
            })
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
    //Have to manually update the local copy of the userArticleList
    this.state.userArticleList.forEach(articleArray => {
      articleArray.forEach(article => {
        this.state.userLocal.savedArticles.forEach(savedArticle => {
          article.isFavorited = false;
          if (savedArticle._id === article._id){
            article.isFavorited = true;
          }
        })
      })
    })
  }

  saveArticle(article){

    var tempUser = {}
    var alreadySaved = false;
    tempUser = this.state.userLocal;

    //Have to catch for not having any saved articles!
    if (!tempUser.savedArticles){
      tempUser.savedArticles = [];
      tempUser.savedArticles.push(article);
      this.setState({userLocal: tempUser}, this.updateUserToDatabase)
      return;
    }

    tempUser.savedArticles.forEach(savedArticle => {
      if(savedArticle._id === article._id){
        alreadySaved = true;
      }
    })
    if (!alreadySaved){    
      tempUser.savedArticles.push(article);
      this.setState({userLocal: tempUser}, this.updateUserToDatabase)
    }
  }

  render() {
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
            {this.state.userPreferences[0] ? <CardOne articles={this.state.userArticleList[0]} saveArticle={this.saveArticle.bind(this)} usersSavedArticles={this.state.userLocal.savedArticles}/> : null}
            {this.state.userPreferences[1] ? <CardOne articles={this.state.userArticleList[1]} saveArticle={this.saveArticle.bind(this)} usersSavedArticles={this.state.userLocal.savedArticles}/> : null}
            {this.state.userPreferences[2] ? <CardOne articles={this.state.userArticleList[2]} saveArticle={this.saveArticle.bind(this)} usersSavedArticles={this.state.userLocal.savedArticles}/> : null}
            {this.state.userPreferences[3] ? <CardOne articles={this.state.userArticleList[3]} saveArticle={this.saveArticle.bind(this)} usersSavedArticles={this.state.userLocal.savedArticles}/> : null}
            {this.state.userPreferences[4] ? <CardOne articles={this.state.userArticleList[4]} saveArticle={this.saveArticle.bind(this)} usersSavedArticles={this.state.userLocal.savedArticles}/> : null}

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
