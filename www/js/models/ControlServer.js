window.ControlServer = Backbone.Model.extend({

  initialize:function(params) {
    this.set('ip', params.ip);
    console.log('control server init');
    this.connection = io.connect('http://' + params.ip + ":8080/conductor");
//    this.connection.on('welcome', this.????.bind(this));
  },

  // ?????: function(data) {
    
  // },

  emit: function(event, data) {
    console.log(data);
    this.connection.emit(event, data);
  }

});
