var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Store' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Store | Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Store | Sign Up' });
});

module.exports = router;
