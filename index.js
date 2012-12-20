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

var room_file = require('./js/rooms.js');


/* create rooms object */

var rooms = new room_file.Rooms();
if (rooms)
  console.log('rooms object created');

/* create clients object */
var clients = new room_file.Clients();
if (clients)
  console.log('clients object created');


io.sockets.on('connection', function(socket) {
  var user;
  
  socket.emit('news', { hello: 'world'});
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  socket.on('create room', function(data) {
    var id = rooms.roomsarray.length;
    console.log('the data passed is: ' + data.name);
    var ro = new room_file.Room(id, data.name);
    rooms.addRoom(ro);
    
    /* inform the all user of the new room */
    for (var  i=0; i < clients.ids.length; i++){
     clients.ids[i].socket.emit('new room', { name: ro.name, id: ro.id});
    }
    
    console.log('room name: ' + ro.name + ' room Id: ' + ro.id);
  });
  
  socket.on('join room', function(data) {
    var room = rooms.getRoomByName(data.room);
    console.log('room is: ' + room.name);
    room.addClient(user);
    console.log('add '+ user.name +' to ' + room.name);
    
  });
  
  socket.on('create user', function(data) {
    id = clients.ids.length;
    user = new room_file.Client(data.name, id, socket);
    clients.addClient(user);
    
    /* inform the new user of the current rooms */
    for (var i = 0; i < rooms.roomsarray.length; i++){
     socket.emit('new room', {name: rooms.roomsarray[i].name, id: rooms.roomsarray[i].id}); 
    }
   
  });
  
  socket.on('chat message', function(data){
    sender = clients.getClientByName(data.client);
    room = rooms.getRoomByName(data.room);
    room.prodcastChatMessage(data.message, data.client);
    
  });
  
  
});