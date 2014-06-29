var io = require('socket.io').listen(3000);

var activeSockets = [];

io.sockets.on('connection', function(socket) {
  var address = socket.handshake.address;
  console.log('socket.io client connected from ' + address.address + ':' + address.port);
  
  socket.on('disconnect', function() {
    console.log('client disconnected');
  });
});

process.on('SIGHUP', function() {
  io.sockets.emit('ping');
});

console.log('Started node server on port 3000 with process id: ' + process.pid);
console.log(' > send socket.io message with');
console.log('   $ kill -1 ' + process.pid );
