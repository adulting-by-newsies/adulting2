const express  = require('express');
const passport = require('passport');
const { User } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

router.post('/register', (req, res) => {
  if (!req || !req.body || !req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and Password required' });
  }

  req.body.username_case = req.body.username;
  req.body.username = req.body.username.toLowerCase();

  const { username } = req.body;
  const newUser = User(req.body);

  User.find({ username }, (err, users) =>
    err ? res.status(400).send({ message: 'Create user failed', err })
      : users[0] ? res.status(400).send({ message: 'Username exists' })
        : newUser.hashPassword().then(() =>
          newUser.save((err, savedUser) =>
            err ? res.status(400).send({ message: 'Create user failed', err })
              : res.send({ message: 'User created successfully', user: savedUser.hidePassword() }))));
});

router.post('/login', (req, res, next) => {
  req.body.username = req.body.username.toLowerCase();

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (info && info.message === 'Missing credentials') {
      return res.status(401).send({ message: 'Missing credentials' });
    }
    if (!user) { return res.status(401).send(info); }

    req.login(user, err =>
      err ? res.status(401).send({ message: 'Login failed', err })
        : res.send({ message: 'Logged in successfully', user: user.hidePassword() }));
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) { res.status(400).send({ message: 'Logout failed', err }); }
    req.sessionID = null;
    req.logout();
    res.send({ message: 'Logged out successfully' });
  });
});
