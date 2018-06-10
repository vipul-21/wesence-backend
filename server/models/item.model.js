var mongoose = require('mongoose');
var moment = require('moment');
var io = require('../io');

var itemSchema = new mongoose.Schema({
    id          : {type: String, required: true, unique: true},
    title       : {type: String, required: true},
    desc        : {type: String, required: true},
    time        : {type: Number},
    notification: {type: Boolean}
});

itemSchema.methods.requiresNotification = function(date) {
  return (this.notification && this.time === moment(date).unix())
};

itemSchema.statics.sendNotifications = function(io, callback) {
  const searchDate = new Date();
  Item.find({}, function(err, items) {
    items = items.filter(function(item) {
            return item.requiresNotification(searchDate);
    });
    if (items.length > 0) {
      sendNotifications(items, io);
    }
  });

    function sendNotifications(items) {
      items.map((item) => {
        io.emit('Reminder', item.title);
      })
    }
};

module.exports = mongoose.model('Item', itemSchema);
