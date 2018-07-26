require('dotenv').config()
var axios = require("axios");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const interestCategoriesTop = ["sports", "politics","science", "technology", "health", "business"]
const interestCategoriesEverything = ["culture", "worldnews","cooking", "lifestyle"]

// This function will step through the various categories and append 10 articles from each to
// a massive results array
function scrapeArticles() {
  var results = [];
  var total = 0;

  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  interestCategoriesTop.forEach(function(theCategory){
    // console.log("newsAPI: category GET for " + theCategory)
    newsapi.v2.topHeadlines({
      country: 'us',
      category: theCategory
    }).then(response => {
      // console.log(JSON.stringify(response));
      var i = 0;
      // console.log("Length is " + response.length);

      // console.log(response.articles);
      response.articles.forEach(function(article){
        console.log(article.title);
        results.push(article);
        i++;
        total++;
        if (i > 10)
          return;
      })
      interestCategoriesEverything.forEach(function(theCategory){
        // console.log("newsAPI: query GET for " + theCategory)
        newsapi.v2.everything({
          q: theCategory
        }).then(response => {
          // console.log(JSON.stringify(response));
          var i = 0;
          // console.log("Length is " + response.length);

          // console.log(response.articles);
          response.articles.forEach(function(article){
            console.log(article.title);
            results.push(article);
            i++;
            total++;
            if (i > 10)
              return;
          })
          console.log("newsAPI: Returning " + total + " articles across 10 categories");
          console.log("Size is " + results.length)
          return results;
          
        });
      });
      
    });
  });


}
function scraping() {
  return new scrapeArticles
}
module.exports = { scraping,
scrapeArticles
}