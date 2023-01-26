"use strict";

var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
  //res.redirect('/links');
  res.render('index');
});
router.get('*', function (req, res) {
  res.render('vacio');
});
module.exports = router;