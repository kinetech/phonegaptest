// client.js

var server = io.connect('10.1.1.28:8080/client');
var brushSettings = {
  brushSize: 5,
  color: "#000000"
};

server.on('welcome', function(data){
  brushSettings.id = data.id;
});

server.on('changeColor', function(data){
  $("#wrapper").hide();
  console.log(data.color);
  $('body').css({'background-color': data.color});
});

server.on('randomColor', function(data){
  var i = Math.floor(Math.random() * 10);
  var color = data.color[i];
  console.log(color);
  $('body').css({'background-color': color});

  $('#modelWindow button').on('click touchend', closeModelMessage, false);

});

$(document).ready(function() {
  $('body').on("touchstart",function(){
      removeMotionListener();
  });

  $('#brushSize').on('touchend', function(e){
    brushSettings.brushSize = this.value;
  });

  $('.colorBlock').on('touchstart', function(e) {
    var color = $(this).data('color');
    brushSettings.color = color;
  });

  server.on('switchPainting', function(data){
    data.paint ? initMotionListener() : removeMotionListener();
  });

  $('#modelWindow button').on('click touchend', closeModelMessage, false);
});

var initMotionListener = function() {
  $('#wrapper').fadeIn();
  window.addEventListener('devicemotion', function(event) {
    var aX = Math.floor(event.acceleration.x);
    var aY = Math.floor(event.acceleration.y);
    var aZ = Math.floor(event.acceleration.z);
    console.log(aX,aY,aZ);
    server.emit('paint',{
      aX: aX,
      aY: aY,
      aZ: aZ,
      color: brushSettings.color,
      brushSize: brushSettings.brushSize,
      brushId: brushSettings.id
    });
  }, false);
};

// TODO: Fix removeMotionListener
var removeMotionListener = function() {
  // $('#wrapper').fadeOut();
  // alert('inside removeMotionListener')
  window.removeEventListener('devicemotion', function(event) {
    var aX = Math.floor(event.acceleration.x);
    var aY = Math.floor(event.acceleration.y);
    var aZ = Math.floor(event.acceleration.z);
  }, false);
};


// Message Functions for Later
var makeModelMessage = function(headline, message) {
  $('#modelWindow h1').text(headline);
  $('#modelWindow p').text(message);
  $('#modelMask').fadeIn(300, function() {
    $('#modelWindow').fadeIn(400);
  });
};

var closeModelMessage = function(e) {
  e.preventDefault();
  $('#modelWindow').fadeOut(300, function() {
    $('#modelMask').fadeOut(200);
    $('#modelWindow h1').text('');
    $('#modelWindow p').text('');
  });
};
