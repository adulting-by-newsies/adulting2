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

const Article          = require('./database/controllers/articleController')

app.use(express.static(assetFolder));
app.use(bodyParser.json());

authConfig(app, express);

app.use('/', routes);

console.log("__dirname")
console.log(__dirname)

// News API Call here
var results = [];

// This function call sets results array to the response
// of aggregating all the articles
newsAPI.scrapeArticles().then(function(response){
  results = app.get('/api/articles/');
  console.log("results");
  console.log(results);
  
});
// for (var i = 0; i < 100; i++){
//   console.log("Title: " + results[i].title);
//   console.log("Category: " + results[i].category)
// }

// newsAPI.scrapeArticles().then(function(response){
//   console.log("In server");
//   results = response;
//   for (var i = 0; i < 100; i++){
//     console.log("Title: " + results[i].title);
//     console.log("Category: " + results[i].category)
//   }
// })

app.listen(port, () => console.log(`Server is listening on port ${port}`));
