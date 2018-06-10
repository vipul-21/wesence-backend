const Item = require('../models/item.model');
var io = require('../io');

const notificationWorkerFactory = function() {
  return {
    run: function() {
      Item.sendNotifications(io);
    },
  };
};

module.exports = notificationWorkerFactory();
