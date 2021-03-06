const express = require('express');
const path = require('path');

const articles     = require('./articles')
const auth         = require('./auth');
const user         = require('./user');
const users        = require('./users');

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/user', user);
router.use('/api/users', users);
router.use('/api/articles', articles);

router.get('/api/tags', (req, res) => {
  res.send([
    'MERN', 'Node', 'Express', 'Webpack', 'React', 'Redux', 'Mongoose',
    'Bulma', 'Fontawesome', 'Ramda', 'ESLint', 'Code', 'Lab', 'Enzyme',
  ]);
});

router.get('/*', (req, res) => {
  console.log("initial get")
  console.log("Send on " + path.resolve(__dirname, '../../dist', 'index.html'))
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
