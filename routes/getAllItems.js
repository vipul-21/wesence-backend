var express = require('express');
var Item = require('../server/models/item.model');

var router = express.Router();

router.get('/', function(req, res) {
  Item.find({}, function(err, list) {
      res.status(200).send(list);
  });
});

module.exports = router;
