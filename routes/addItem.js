var express = require('express');
var Item = require('../server/models/item.model');

var router = express.Router();

router.post('/', function(req, res) {
  var item = new Item({
      title: req.body.item.title,
      desc: req.body.item.desc,
      time: req.body.item.time,
      notification: req.body.item.notification,
      id: uniqid(),
  });

  Item.findOne({ id: item.id }, function(err, existingItem) {
      if (existingItem) {
          return res.status(400).send('The item already exists.');
      }
      item.save(function(err) {
          if (err) {
              console.log(err);
              res.status(500).send('Error saving new item (database error). Please try again.');
              return;
          }
          res.status(200).send('Item Added!');
      });
  });
});

module.exports = router;
