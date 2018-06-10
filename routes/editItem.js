var express = require('express');
var Item = require('../server/models/item.model');

var router = express.Router();

router.post('/', function(req, res) {
  Item.findOne({ id: req.body.item.id }, function(err, item) {
      if (err) {
          console.log(err);
          return res.status(400).send('Error updating the item.');
      }
      item.title = req.body.item.title;
      item.desc = req.body.item.desc;
      item.time = req.body.item.time;
      item.notification = req.body.item.notification;
      item.save(function(err) {
          if (err) {
              console.log(err);
              res.status(500).send('Error updating the item.');
              return;
          }
          res.status(200).send('Item Updated.');
      });
  });
});

module.exports = router;
