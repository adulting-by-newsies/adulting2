import React, {Component} from 'react';
import CardOne from '../Homepage/CardOne.js';
import CardTwo from '../Homepage/CardTwo.js';
import CardThree from '../Homepage/CardThree.js';
import CardFour from '../Homepage/CardFour.js';
import CardFive from '../Homepage/CardFive.js';

import {
  postRegister, postLogin, postLogout, getUser, putUser, putUserPassword, getArticleByCategory
} from '../../utils/api';

export default class HomePage extends Component {

  state = {
    userArticleList: [],
    userPreferences: [],
    username: ""
  }

  componentDidMount() {
    getUser().then(data => {
      console.log(data.user);
      this.setState({username: data.user.username});
      console.log(data.user.preferences.length)
      if (data.user.preferences.length === 0){
        console.log("User has no preferences!")
        //TODO: Write some code to build out a default homepage
        getArticleByCategory("sports").then(article => {
          console.log(article);
        })
      } else {
        //TODO: Handle all the cases to build out the article list
        // with the preferences given here
      }
    })
  }

  render() {
    return (
      <div className="home-page">
        <div className="section">
          <div className="container">
            <h1 className="title is-1">
              Welcome to your personalized article feed, {this.state.username}!
            </h1>
            <CardOne />
            <CardTwo />
            <CardThree />
            <CardFour />
            <CardFive />
          </div>
        </div>
      </div>
    );
  }
}
