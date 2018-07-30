var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  snapshotSum: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  hrefToImage: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },

});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Note model
module.exports = Article;
