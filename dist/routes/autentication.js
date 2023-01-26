"use strict";

var express = require('express');
var router = express.Router();
var passport = require('passport');
var _require = require('../lib/auth'),
  isLoggedIn = _require.isLoggedIn;
var _require2 = require('../lib/auth'),
  isNotLoggedIn = _require2.isNotLoggedIn;
router.get('/signup', isNotLoggedIn, function (req, res) {
  res.render('auth/signup');
});
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failreFlash: true
}));
router.get('/signin', isNotLoggedIn, function (req, res) {
  res.render('auth/signin');
});
router.post('/signin', isNotLoggedIn, function (req, res, next) {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});
router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile');
});
router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect('/signin');
    }
  });
});
module.exports = router;