var utils = {};

utils.setBrushSize = function(e){
  client.brushSize = e.target.value;
};

utils.setColor = function(e) {
  client.color = e.target.dataset.color;
};