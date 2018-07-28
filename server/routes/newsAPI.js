// This function will step through the various categories and append 10 articles from each to
// a massive results array
require('dotenv').config()
var axios = require("axios");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const interestCategoriesTop = ["sports", "politics","science", "technology", "health", "business"]
const interestCategoriesEverything = ["culture", "worldnews","cooking", "lifestyle"]
const allCategories = ["sports", "politics","science", "technology", "health", "business", "culture", "worldnews","cooking", "lifestyle"]
var userDetails;

// This API call targets categories that the newsapi supports 'natively'
// with its topHeadlines function.
// This works for 6 of our 10 categories.
// 
// Returns a promise that gives the response
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

// This API call targets categories that the newsapi does not support 'natively'.
// The everything call allows you to input your own query with the q limiter
// This works for 4 of our 10 categories.
// 
// Returns a promise that gives the response
function everythingCategoryAPICall(theCategory) {
  return new Promise((resolve, reject) => {
    newsapi.v2.everything({
      q: theCategory
    }).then(response => {
      resolve(response);
    })
  })
}

// Error handling here when the promise is rejected
var errHandler = function(err) {
    console.log("ERROR IN newsAPI.js");
    console.log(err);
}

function scrapeArticles() {
  var listOfArticles = [];
  var total = 0;

  return Promise.all(
    [
      topCategoryAPICall(interestCategoriesTop[0]), 
      topCategoryAPICall(interestCategoriesTop[1]), 
      topCategoryAPICall(interestCategoriesTop[2]),
      topCategoryAPICall(interestCategoriesTop[3]),
      topCategoryAPICall(interestCategoriesTop[4]),
      topCategoryAPICall(interestCategoriesTop[5]),
      everythingCategoryAPICall(interestCategoriesEverything[0]),
      everythingCategoryAPICall(interestCategoriesEverything[1]),
      everythingCategoryAPICall(interestCategoriesEverything[2]),
      everythingCategoryAPICall(interestCategoriesEverything[3]),
    ]).then(function(values) {
      for (var i = 0; i < 10; i++){
        // console.log("Do iteration " + i)
        var j = 0;
        values[i].articles.some(function(article){
          total++;
          j++;
          article.category = allCategories[i]
          // console.log("Title : " + article.title)
          listOfArticles.push(article);
          // console.log(article);
          return j === 10;
        })
        console.log("Captured " + total + " articles")
      }
      console.log("Returning now ");
      // console.log("Should get back " + listOfArticles)
      return listOfArticles;
  });

}

module.exports = {scrapeArticles}
