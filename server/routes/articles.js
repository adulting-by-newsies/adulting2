const { Article } = require('../database/schemas');
const articleController = require("../database/controllers/articleController");
const router = require("express").Router();
module.exports = router;

// Post route to write into the database for the articles
// or return all articles
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create);

// For a specific article ID, get or remove that article
router
  .route("/:id")
  .get(articleController.findById)
  .delete(articleController.remove);

router
  .route("/by-category/:category")
  .get(articleController.findByCategory);

module.exports = router;
