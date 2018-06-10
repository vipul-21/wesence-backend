var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    http = require('http')
    socketServer =require('socket.io')
    uniqid = require('uniqid'),
    Item = require('./server/models/item.model')
    scheduler = require('./server/cron/cron'),
    io = require('./server/io');
    config = require('./config/database')

/********************************
Routes Import
********************************/
var addItem = require('./routes/addItem');
var getAllItems = require('./routes/getAllItems');
var removeItem = require('./routes/removeItem');
var editItem = require('./routes/editItem');

/********************************
MongoDB Connection
********************************/
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

/********************************
Express Settings
********************************/
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/addItem', addItem);
app.use('/api/getAllItems', getAllItems);
app.use('/api/removeItem', removeItem);
app.use('/api/editItem', editItem);

scheduler.start();

var httpserver = http.createServer(app);
var server = httpserver.listen(8000, function() {
    console.log('Magic happens on port 8000');
});

io.attach(server);
