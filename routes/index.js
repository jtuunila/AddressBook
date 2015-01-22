var express = require('express');
var router = express.Router();
var userManager = require('../modules/userManager');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { status: '' });
  //userManager.getUsers(req, res);
});

router.get('/register', function(req, res) {
  res.render('registerUser', {});
});

module.exports = router;
