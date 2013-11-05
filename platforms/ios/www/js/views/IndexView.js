ClientApp.IndexView = Backbone.View.extend({

  events: {
    "touchstart .ip":  "getClientIP",
    "touchstart .cast":  "showCastList",
    "touchstart .shows":  "showUpcomingShows",
    "click .ip":  "getClientIP",
    "click .cast":  "showCastList",
    "click .shows":  "showUpcomingShows"
  },

  initialize: function() {
    this.template = this.model.get('templates')['index'];
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    return this;
  },

  getClientIP: function() {
    if (navigator.notification) {
      var that = this;
      navigator.notification.prompt(
        'Enter the provided IP',
        function(results) { that.connect(results.input1, that.model, that); },
        'Connect to the show',
        ['Ok','Exit']
      );
    } else {
      var ip = prompt('wfkjdfkjsdf');
      this.connect(ip, this.model, this);
    }
  },


  connect: function(ip, clientModel, context) {
    var socketScriptURL = "http://" + ip + ":8080/socket.io/socket.io.js";
    $.getScript(socketScriptURL)
      .done(function(script, textStatus) {
        console.log('Script aquired');
        $('#spinner').hide();
        clientModel.startShow(ip);
      })
      .fail(function(jqxhr, settings, exception) {
        console.log('Failed');
        context.showAlert('Error', 'Please try again.');
        context.getClientIP();
      });
    $('#spinner').show();

  },

  showCastList: function() {
    this.model.getCastList();
  },

  showUpcomingShows: function() {
    this.model.getUpcomingShows();
  },

  showAlert: function(title, message) {
    navigator.notification.alert(message, null, title, "OK!");
  },

});