

/* room object */
function Room(id, name) {
 this.id = id;
 this.name = name;
 this.clients = [];
}

Room.prototype = {
  sendMessage : sendMessage,
  addClient : addClient,
  removeClient : removeClient,
  prodcastMessage : prodcastMessage,
  messagetToClient : messageToClient,
};

function Rooms() {
  this.roomsarray = [];
}
Rooms.prototype = {
  getRoomByClient: getRoomByClient,
  getRoomById: getRoomById,
  deleteRoom: deleteRoom,
  addRoom: addRoom
};

function Client(name, socket) {
 this.name = name;
 this.Id = clients.ids + 1;
 this.socket = socket;
}

Client.prototype = {
  createClient: createClient
};

function Clients () {
 this.ids = []; 
}
clients = {
  newClient: newClient,
  deleteClient: deleteClient
};

/* Functions implemntation room object */
sendMessage = function(message){
  console.log("room.sendMessage called");
};

addClient = function(client) {
  this.clients.push(client);
};

removeClient = function(client){
  this.clients[client].remove();
};

prodcastMessage = function(message){
  for (c in this.clients) {
    c.socket.send(message);
  }
};

messageToClient = function(message, client) {
  this.clients[client].socket.send(message);
}


/* Functions implemntation for rooms object */
getRoomByClient = function(client) {
  for (r in this.roomsarray){
    for (c in r.clients) {
      if (c.Id === client.Id)
	return r;
    }
  }
  return "not found";
};

getRoomById = function(Id) {
  for ( r in this.roomsarray){
    if (r.Id === Id)
      return r;
  }
  return "not found";
};

deleteRoom = function(room) {
  this.roomsarray[room].remove();
};

addRoom = function(room) {
  this.roomsarray.push(room);
}



