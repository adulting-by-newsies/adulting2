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

  // Kick off all 10 promises at once, whee!!!!
  // This will return a massive object that is an aggregate
  // of all the results
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
      // Each of the API calls returns 20 results per query, but we will
      // chop off the first 10 of them.  Unfortunately the API doesn't offer
      // a parameter to limit the number of results (or if it does it isn't
      // documented on the website)
      for (var i = 0; i < 10; i++){
        var j = 0;
        // Use .some here, it's a truncated version of forEach that allows
        // you to escape early
        values[i].articles.some(function(article){
          total++;
          j++;
          // Here we add a category field to each article object, this should
          // make it easier to parse through so you know what class of article
          // you're looking at
          article.category = allCategories[i]
          // Add to the array
          listOfArticles.push(article);
          // This is the escape for when you've added 10 articles
          return j === 10;
        })
        console.log("Captured " + total + " articles")
      }
      console.log("Returning now ");
      return listOfArticles;
  });

}

module.exports = {scrapeArticles}
