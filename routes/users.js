var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // #swagger.ignore = true
  res.send('respond with a resource');
});

module.exports = router;
