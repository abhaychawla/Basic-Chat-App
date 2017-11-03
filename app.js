var express = require('express');
var bodyParser = require('body-parser');

var io = require('socket.io')();

//Init app
var app = express();

//Setup template engine
app.set('view engine', 'ejs');

//Create a http server
var server = require('http').Server(app);

io.attach(server);

//Set static file folder
app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Chat Room'
  });
});

io.on('connection', function(socket) {
  console.log('User connected!'+' '+socket.id);
  socket.on('error', function(err) {
    console.log(err);
  });
  socket.on('chat message', function(msg) {
    console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('typing', function(msg) {
    console.log(msg);
    socket.broadcast.emit('typing', msg);
  });
  socket.on('disconnect', function() {
    console.log('User disconnected!');
  });
});

//Listen to port
server.listen(3000, function() {
  console.log('Listening to port 3000');
});
