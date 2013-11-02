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
  },

  showCastList: function() {
    this.model.getCastList();
  },

  showUpcomingShows: function() {
    this.model.getUpcomingShows();
  }

});