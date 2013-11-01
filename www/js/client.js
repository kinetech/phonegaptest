// client.js
var brushSettings = {
  brushSize: 5,
  color: "#000000"
};
var server = io.connect('http://169.254.37.109:8080/client');

server.on('welcome', function(data){
    brushSettings.id = data.id;
});

server.on('changeColor', function(data){
  $('body').css({'background-color': data.color});
});

server.on('randomColor', function(data){
  var i = Math.floor(Math.random() * 10);
  var color = data.color[i];
  $('body').css({'background-color': color});
  $('#modelWindow button').on('click touchend', closeModelMessage, false);
});
       
server.on('switchPainting', function(data){
  console.log(data.paint);
  data.paint ? initMotionListener() : removeMotionListener();
});


$('#brushSize').on('touchend', function(e){
  brushSettings.brushSize = this.value;
});

$('.colorBlock').on('touchstart', function(e) {
  var color = $(this).data('color');
  brushSettings.color = color;
});

var initMotionListener = function() {
  $('#wrapper').show();
  window.addEventListener('devicemotion', getDeviceMotion, true);
};

var removeMotionListener = function() {
  $('#wrapper').hide();
  window.removeEventListener('devicemotion', getDeviceMotion, true);
};

var getDeviceMotion = function(event) {
    var aX = Math.floor(event.acceleration.x);
    var aY = Math.floor(event.acceleration.y);
    var aZ = Math.floor(event.acceleration.z);
    server.emit('paint',{
        aX: aX,
        aY: aY,
        aZ: aZ,
        color: brushSettings.color,
        brushSize: brushSettings.brushSize,
        brushId: brushSettings.id
    });
};