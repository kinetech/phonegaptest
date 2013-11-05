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
        function(results) { that.connect(results, that.model, that); },
        'Connect to the show',
        ['Ok','Exit']
      );
    } else {
      var ip = prompt('Enter IP:');
      this.connect(ip, this.model, this);
    }
  },


  connect: function(results, clientModel, ctx) {
    if(results.buttonIndex  === 1) {
      var ip = results.input1;
      if (ip === 'controller') {
        ctx.getController(clientModel, ctx);
      } else {
        var socketScriptURL = "http://" + ip + ":8080/socket.io/socket.io.js";
        $.getScript(socketScriptURL)
          .done(function(script, textStatus) {
            $('#spinner').hide();
            clientModel.startShow(ip);
          })
          .fail(function(jqxhr, settings, exception) {
            ctx.showAlert('Error', 'Please try again.');
          });
        // TODO: Give user an out.
        $('#spinner').show();
      }
    }

  },

  getController: function(clientModel, ctx) {
    if (navigator.notification) {
      navigator.notification.prompt(
        'Enter the provided IP',
        function(results) { ctx.connectAsController(results, clientModel, ctx); },
        'Connect as controller',
        ['Ok','Exit']
      );
    } else {
      var ip = prompt('Enter IP:');
      ctx.connectAsController(results, clientModel, ctx);
    }
  },

  connectAsController: function(results, clientModel, ctx) {
    if(results.buttonIndex  === 1) {
      var ip = results.input1;
      var socketScriptURL = "http://" + ip + ":8080/socket.io/socket.io.js";
      $.getScript(socketScriptURL)
        .done(function(script, textStatus) {
          console.log('script accepted');
          $('#spinner').hide();
          clientModel.startController(ip);
        })
        .fail(function(jqxhr, settings, exception) {
          ctx.showAlert('Error', 'Please try again.');
        });
      // TODO: Give user an out.
      $('#spinner').show();
    }
  },

  showCastList: function() {
    this.model.getCastList();
  },

  showUpcomingShows: function() {
    this.model.getUpcomingShows();
  },

  showAlert: function(title, message) {
    navigator.notification.alert(message, null, title, "OK");
  },

});