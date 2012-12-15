var express = require('express')
  , app = express();
  
/* serve static files */
app.configure(function(){
  app.use('/media', express.static(__dirname + '/media'));
  app.use('/js', express.static(__dirname + '/js'));
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

var server = app.listen(3000);
var io = require('socket.io').listen(server);




io.sockets.on('connection', function(socket) {
  socket.emit('news', { hello: 'world'});
  socket.on('my other event', function (data) {
    console.log(data);
  });
});