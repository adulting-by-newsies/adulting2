const database = require("../schemas/");


module.exports = {
  findAll: function(req, res) {
    database.Article
      .find({})
      .then(dbModel => res.json(dbModel))
      // .then(function(dbModel) {res.send(dbModel)})
      // .catch(err => res.status(422).json(err));
      .catch(err => console.log(err));
  },
  findById: function(req, res) {
    database.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByCategory: function(req, res) {
    database.Article
      .find({})
      .then(dbModel =>
        dbModel.forEach(article => {
          if (article.category === req.params.category) {
            res.json(article);
          }
        }))
      .catch(err => res.status(422).json(err));
  },
  findAllByCategory: function(req, res) {
    var allByCategory = {};
    database.Article
      .find({category : req.params.category})
      .limit(5)
      .then(dbModel =>
        
        // dbModel.forEach(article => {
        //   if (article.category === req.params.category) {
        //     allByCategory.push(article);
        //   }
        // })
        res.json(dbModel)
      )
      .catch(err => res.status(422).json(err));
  },
  updateOne: function(req, res) {
    database.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    database.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    database.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
