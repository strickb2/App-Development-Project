var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Store' });
});

/* GET product page */
router.get('/product', function(req, res, next) {
  res.render('product', { title: 'Store | Product' });
});


module.exports = router;
