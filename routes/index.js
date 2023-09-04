var express = require('express');
var router = express.Router();
require('dotenv').config();

const { SAMPLE_ENV } = process.env;
console.log(SAMPLE_ENV);

/* GET home page. */
router.get('/', function(req, res, next) {
  // #swagger.ignore = true
  res.render('index', { title: 'Express' });
});

module.exports = router;
