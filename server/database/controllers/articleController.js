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
