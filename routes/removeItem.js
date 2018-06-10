var express = require('express');
var Item = require('../server/models/item.model');

var router = express.Router();

router.post('/', function(req, res) {
  Item.remove({ id: req.body.id }, function(err) {
      if (err) {
          console.log(err);
          res.status(500).send('Error deleting item.');
          return;
      }
      res.status(200).send('Item successfully deleted.');
  });
});

module.exports = router;
