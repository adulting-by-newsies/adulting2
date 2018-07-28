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

app.use(express.static(assetFolder));
app.use(bodyParser.json());

authConfig(app, express);

app.use('/', routes);

// News API Call here
var results = newsAPI.scraping();
if(results) {
  console.log("Succesful scrape of articles with News API")
}

app.listen(port, () => console.log(`Server is listening on port ${port}`));
