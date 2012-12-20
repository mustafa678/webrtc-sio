

/* room object */
function Room(id, name) {
 this.id = id;
 this.name = name;
 this.clients = [];
}
exports.Room = Room;

Room.prototype = {
  sendMessage : function(message){console.log("room.sendMessage called");},
  addClient : function(client) {this.clients.push(client);},
  removeClient : function(client){this.clients[client].remove();},
  prodcastChatMessage : function(message, sender){
    for (var c = 0; c < this.clients.length; c++) {
      this.clients[c].socket.emit('chat message', {sender: sender, msg: message});
    }
  },
  messagetToClient : function(message, client) {this.clients[client].socket.send(message);}
};

function Rooms() {
  this.roomsarray = [];
}
exports.Rooms = Rooms;

Rooms.prototype = {
  
  getRoomByClient: function(client) {
    for (var r=0; r < this.roomsarray.length; r++){
      for (var c=0; c < this.roomsarray[r].clients.length; c++) {
	if (this.roomsarray[r].clients[c].Id === client.Id)
	  return r;
      }
    }
    return "not found";
  },
  
  getRoomByName: function(name){
    for ( var r = 0; r < this.roomsarray.length; r++){
      if (this.roomsarray[r].name === name)
	return this.roomsarray[r];
    }
    console.log('not found');
  },
  
  getRoomById: function(Id) {
    for( var r = 0; r < this.roomsarray.length; r++){
      if (this.roomsarray[r].Id === Id)
	return this.roomsarray[r];
    }
    return "not found";
  },
  deleteRoom: function(room) {this.roomsarray[room].remove();},
  addRoom:  function(room) {this.roomsarray.push(room);}
};

function Client(name, id, socket) {
 this.name = name;
 this.Id = id;
 this.socket = socket;
}
exports.Client = Client;

Client.prototype = {
  createClient: function(socket){console.log('client created');}
};

function Clients () {
 this.ids = []; 
}
exports.Clients = Clients;

Clients.prototype = {
  addClient: function(client){ this.ids.push(client);},
  deleteClient: function(client){console.log('client delete called');},
  getClientByName: function(name){
    for ( var r = 0; r < this.ids.length; r++){
      if (this.ids[r].name === name)
	return this.ids[r];
    }
    console.log('not found');
  }
};
