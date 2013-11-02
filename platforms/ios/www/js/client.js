// client.js

var client = {};

client.initialize = function() {
  document.addEventListener('deviceready', function(e) {
    client.initializeClientDevice();
    server.makeConnection();
    client.showAlert('Welcome!', 'You are connected and ready for the show!');
  }, false);
};

client.showAlert = function (title, message) {
  navigator.notification.alert(message, null, title, "OK!");
};

client.initializeClientDevice = function() {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      client.position = {latitude: position.coords.latitude, longitude: position.coords.longitude };
    }
  );
  client.brushSize = 5;
  client.color = "#000000";
};


client.initMotionListener = function() {
  $('#wrapper').show();

  $('#brushSize').on('touchend', utils.setBrushSize);
  $('.colorBlock').on('touchstart', utils.setColor);

  var delay = { frequency: 50 };
  client.watchID = navigator.accelerometer.watchAcceleration(onDeviceMotion, null, delay);
};

client.removeMotionListener = function() {
  $('#wrapper').hide();

  $('#brushSize').off('touchend', utils.setBrushSize);
  $('.colorBlock').off('touchstart', utils.setColor);

  navigator.accelerometer.clearWatch(client.watchID);
  client.watchID = null;
};

var onDeviceMotion = function(acceleration) {
    server.emit('paint',{
        aX: acceleration.x,
        aY: acceleration.y,
        aZ: acceleration.z,
        color: client.color,
        brushSize: client.brushSize,
        brushId: client.id
    });
};
