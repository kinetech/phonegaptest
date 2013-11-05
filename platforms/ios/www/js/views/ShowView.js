ClientApp.ShowView = Backbone.View.extend({
  
  className: "showWrapper",

  events: {
    'click #brushSize' : 'setBrushSize',
    'click .colorBlock': 'setColor'
  },

  initialize: function(params) {
    this.currentColor = '#000000';
    this.template = this.model.get('templates')['show'];
    this.ip = this.model.get('ip');
    this.server = params.server;
    this.watchID = null;
    this.server.on('changeBG', this.updateBackgroundColor.bind(this));
    this.server.on('initMotionListener', this.initMotionListener.bind(this));
    this.server.on('removeMotionListener', this.removeMotionListener.bind(this));
    this.server.on('setID', this.setClientID.bind(this));
    this.showAlert('Welcome!', 'Get ready for the show!');
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  setClientID: function(id) {
    this.model.set('brushId', id);
  },

  showAlert: function(title, message) {
    if (navigator.notification) {
      navigator.notification.alert(message, null, title, "OK!");
    } else {
      alert(message);
    }
  },

  updateBackgroundColor: function(color) {
    console.log('updating color');
    this.currentColor = color;
    this.$el.animate({
      backgroundColor: color
    }, 1500);
  },

  initMotionListener: function() {
   this.$el.animate({
      backgroundColor: '#000000'
    }, 1000);
    this.$el.find('.controls').fadeIn(500);
    var that = this;
    var delay = { frequency: 50 };
    this.watchID = navigator.accelerometer.watchAcceleration(
      function(acc) {
        that.onDeviceMotion(acc, that.server, that.model);
      },
      null,
      delay
    );
  },

  removeMotionListener: function() {
    var that = this;
    this.$el.find('.controls').fadeOut(500);
    this.$el.animate({
      backgroundColor: that.currentColor
    }, 1000);
    navigator.accelerometer.clearWatch(this.watchID);
    this.watchID = null;
  },

  onDeviceMotion: function(acceleration, server, client) {
    server.emit('paint',{
      aX: acceleration.x,
      aY: acceleration.y,
      aZ: acceleration.z,
      color: client.get('color'),
      brushSize: client.get('brushSize'),
      brushId: client.get('brushId')
    });
  },

  setBrushSize: function(event) {
   this.model.set('brushSize', event.target.value);
  },

  setColor: function(event) {
    this.model.set('color', event.target.dataset.color);
  }

});
