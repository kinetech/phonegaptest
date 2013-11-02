window.ClientApp = Backbone.View.extend({
  
  events: {
    "touchstart .ip":  "getClientIP",
    "touchstart .cast":  "showCastList",
    "touchstart .shows":  "showUpcomingShows"
  },

  initialize: function() {
    $('body').append(this.render().el);
//    this.router = new Shortly.Router({ el: this.$el.find('#container') });
    // this.router.on('navigate', this.updateNav, this);
    // use this to to triggers on routing
  //  Backbone.history.start({pushstate:true});
  },

  render: function(){
    var source = $("#clientAppView-template").html();
    var template = Handlebars.compile(source);
    var html = template( { show: 'Name of show' } );
    this.$el.html(html);
    return this;
  },

  getClientIP: function() {
    var that = this;
    navigator.notification.prompt(
      'Enter the provided IP',
      that.connect,
      'Connect to the show',
      ['Ok','Exit']
    );
  },

  connect: function(results) {
    alert(results.input1);
    // make a new show instance
    // send it IP to make URL
    // render a show to device  
  },

  showCastList: function() {
    this.showAlert('TODO', "Set up remote point to serve cast list via AJAX");
    // route to cast page
    //this.router.navigate("/showCastList");
  },

  showUpcomingShows: function() {
    this.showAlert('TODO', "Set up remote point to serve show info via AJAX");
    // route to upcoming show page
    //this.router.navigate("/showUpcomingShows");
  },

  showAlert: function (title, message) {
    navigator.notification.alert(message, null, title, "OK!");
  }

});