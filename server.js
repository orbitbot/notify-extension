// SSE setup
var SSE = require('sse');
var http = require('http');

var sseClients = [];

var server = http.createServer(function(req, res) {
  console.log('createserver hit');
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.end('done');
});

server.listen(8080, function() {
  var sse = new SSE(server);
  sse.on('connection', function(client) {
    console.log('got new sse connection');
    sseClients.push(client);

    client.on('close', function() {
      console.log('sse connection closed');
      sseClients.splice(sseClients.indexOf(client));
    });
  });
});


// socket.io setup
var io = require('socket.io').listen(3000);

io.sockets.on('connection', function(socket) {
  var address = socket.handshake.address;
  console.log('socket.io client connected from ' + address.address + ':' + address.port);
  
  socket.on('disconnect', function() {
    console.log('socket.io client disconnected');
  });
});


// message passing
process.on('SIGHUP', function() {
  io.sockets.emit('ping');
});

process.on('SIGINT', function() {
  var clientCount = sseClients.length;
  if (clientCount > 0)
    for (var i = 0; i < clientCount; ++i)
      sseClients[i].send('ping', ' ');
});


console.log('Started node server on port 3000 with process id: ' + process.pid);
console.log(' > send socket.io message with');
console.log('   $ kill -1 ' + process.pid );
console.log(' > send SSE message with');
console.log('   $ kill -2 ' + process.pid );
