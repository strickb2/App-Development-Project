var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Store' });
});

router.get('/product', function(req, res, next) {
  res.render('product', { title: 'Store | Product' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Store | Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Store | Sign Up' });
});

router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Store | Cart' });
});

router.get('/order', function(req, res, next) {
  res.render('order', { title: 'Store | Order' });
});

module.exports = router;
