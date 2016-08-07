// modules requirements
require('lookup-multicast-dns/global');
var topology = require('fully-connected-topology');
var jsonStream = require('duplex-json-stream');
var streamSet = require('stream-set');
var toPort = require('hash-to-port');
var register = require('register-multicast-dns');

// input buffer
var me = process.argv[2];
var peers = process.argv.slice(3);
 //topology creation and connecting all available peers to streamSet
var swarm = topology(toAddress(me), peers.map(toAddress));
var connections = streamSet();
var received = {};

//registering for multicast-dns
register(me);

//gets the available connections and and its inputs
swarm.on('connection', function (socket, id) {
  console.log('info> direct connection to', id);

  socket = jsonStream(socket)
  socket.on('data', function (data) {
    if (data.seq <= received[data.from]) return // already received this one
    received[data.from] = data.seq ;
    console.log(data.username + '> ' + data.message);
    connections.forEach(function (socket) {
      socket.write(data);
  });
  });

  connections.add(socket);
});

//temp logs of chat.
var seq = 0 ;
var id = Math.random();

//checks the iput beffer on executes socket.write
process.stdin.on('data', function (data) {
  connections.forEach(function (socket) {
    var message = data.toString().trim() ;
    socket.write({from: id, seq: seq++, username: me, message: message})
});
});

//username hasing to port
function toAddress (name) {
  return name + '.local:' + toPort(name);
}
