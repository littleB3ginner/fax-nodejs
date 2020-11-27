var express = require('express');
var router = express.Router();
var controller = require('../controller/jsonController');
/* GET home page. */
router.get('/', function(req, res) {
  var info = {
    name: req.query.name ,
    age: req.query.age ,
    gender: req.query.gender ,
    location: req.query.location
  }
  res.render('index', {
    title: 'Express',
    users: controller.getUserList(),
    info
  });
});

module.exports = router;
