var io = require('socket.io')();

io.on('connection', function (socket) {
  console.log('connected');
});

module.exports = io;
