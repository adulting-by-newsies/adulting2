// This function will step through the various categories and append 10 articles from each to
// a massive results array
// var request = require("request");
require('dotenv').config()
var axios = require("axios");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const interestCategoriesTop = ["sports", "politics","science", "technology", "health", "business"]
const interestCategoriesEverything = ["culture", "worldnews","cooking", "lifestyle"]
var userDetails;

function topCategoryAPICall(theCategory) {
  return new Promise((resolve, reject) => {
    newsapi.v2.topHeadlines({
      country: 'us',
      category: theCategory
    }).then(response => {
      resolve(response);
    })
  })
}

function everythingCategoryAPICall(theCategory) {
  return new Promise((resolve, reject) => {
    newsapi.v2.everything({
      q: theCategory
    }).then(response => {
      resolve(response);
    })
  })
}

var errHandler = function(err) {
    console.log("ERROR");
    console.log(err);
}

function main() {
  var listOfArticles = [];
  var total = 0;
  var dataPromise = everythingCategoryAPICall(interestCategoriesEverything[0]);
  // var dataPromise = topCategoryAPICall(interestCategoriesTop[0]);
  // Get user details after that get followers from URL

  dataPromise.then(function(result){
    var i = 0;
    result.articles.some(function(article){
      total++;
      i++;
      console.log("Title : " + article.title)
      listOfArticles.push(article);
      return i === 10;
    })
    console.log("Captured " + total + " articles")
  })

}


main();
