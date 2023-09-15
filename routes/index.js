var express = require('express');
var router = express.Router();
require('dotenv').config();

const { ENV_VARIALBES } = process.env;
console.log('環境變數：', ENV_VARIALBES);

/* GET home page. */
router.get('/', function(req, res, next) {
  // #swagger.ignore = true
  res.render('index', { title: 'Express', env: ENV_VARIALBES });
});

module.exports = router;
