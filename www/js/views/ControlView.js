ClientApp.ControlView = Backbone.View.extend({
  
  className: "controlWrapper",

  events: {

  },

  initialize: function(params) {
    this.template = this.model.get('templates')['controller'];
    this.server = params.server;
    this.ip = this.server.get('ip');
    console.log('control view initialized');
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  showAlert: function(title, message) {
    if (navigator.notification) {
      navigator.notification.alert(message, null, title, "OK!");
    } else {
      alert(message);
    }
  }

});
