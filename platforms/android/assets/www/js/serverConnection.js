// serverConnection.js

var server = {
  serverIP: 'http://10.1.1.28:8080/client'
};

server.makeConnection = function() {
  server.connection = io.connect(server.serverIP);

  server.connection.on('welcome', function(data){
      client.id = data.id;
      server.emit('location', client.position);
  });

  server.connection.on('changeColor', function(data){
    $('body').css({'background-color': data.color});
  });

  server.connection.on('randomColor', function(data){
    var i = Math.floor(Math.random() * 10);
    var color = data.color[i];
    $('body').css({'background-color': color});
  });
         
  server.connection.on('switchPainting', function(data){
    data.paint ? client.initMotionListener() : client.removeMotionListener();
  });
};

server.emit = function(event, data) {
  server.connection.emit(event, data);
};
