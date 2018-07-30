const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');

require('./config/environment');
require('./database');

const routes       = require('./routes/index');
const authConfig   = require('./config/passport');

const assetFolder  = path.resolve(__dirname, '../dist/');
const port         = process.env.PORT;
const app          = express();
const newsAPI      = require('./routes/newsAPI')

const Article          = require('./database/schemas/Article')

app.use(express.static(assetFolder));
app.use(bodyParser.json());

authConfig(app, express);

app.use('/', routes);

// News API Call here
var results = [];

// This function call sets results array to the response
// of aggregating all the articles
newsAPI.scrapeArticles().then(function(response){
  console.log("In server");
  results = response;
  // console.log(results[0]);

  for (var i = 0; i < 100; i++){
    Article.create(results[i])
      .then(function(dbArticle) {
        // View the added result in the console
        // console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        // return res.json(err);
        console.log(err);
      });
    // console.log("Title: " + results[i].title);
    // console.log("Category: " + results[i].category)
  }
  // app.post('/api/articles/all-articles', results);
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));
