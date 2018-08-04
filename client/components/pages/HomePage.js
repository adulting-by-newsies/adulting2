import React, {Component} from 'react';
import CardOne from '../Homepage/CardOne.js';
import CardTwo from '../Homepage/CardTwo.js';
import CardThree from '../Homepage/CardThree.js';
import CardFour from '../Homepage/CardFour.js';
import CardFive from '../Homepage/CardFive.js';

import {
  postRegister, postLogin, postLogout, getUser, putUser, putUserPassword, getArticleByCategory, getAllArticlesByCategory
} from '../../utils/api';

export default class HomePage extends Component {

  state = {
    userArticleList: [],
    userPreferences: [],
    username: ""
  }

  componentDidMount() {
    getUser().then(data => {
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
  render() {
    console.log('RENDERING--------------------------------')
    return (
      <div className="home-page">
        <div className="section">
          <div className="container">
            <h1 className="title is-1">
              Welcome to your personalized article feed, {this.state.username}!
            </h1>
            {this.state.userPreferences[0] ? <CardOne articles={this.state.userArticleList[0]}/> : null}
            {this.state.userPreferences[1] ? <CardOne articles={this.state.userArticleList[1]}/> : null}
            {this.state.userPreferences[2] ? <CardOne articles={this.state.userArticleList[2]}/> : null}
            {this.state.userPreferences[3] ? <CardOne articles={this.state.userArticleList[3]}/> : null}
            {this.state.userPreferences[4] ? <CardOne articles={this.state.userArticleList[4]}/> : null}
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
