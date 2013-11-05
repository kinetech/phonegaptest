ClientApp.Router = Backbone.Router.extend({
  
  initialize: function(options) {
    this.$el = options.el;
    this.model = options.model;
  },

  routes: {
    "": "index",
    "showCastList": "showCastList",
    "showUpcomingShows": "showUpcomingShows",
    "show": "startShow"
  },
  
  swapView: function(view) {
    if ( this.$el.css('display') == 'none') {
      this.$el.show();
    }
    this.$el.html( view.render().el);
  },

  index: function(){
    console.log('index route');
    var indexView = new ClientApp.IndexView({ model: this.model });
    this.swapView(indexView);
  },

  showCastList: function() {
    console.log('cast route');
    var castView = new ClientApp.CastView({ model: this.model });
    this.swapView(castView);
  },

  showUpcomingShows: function() {
    console.log('upcoming shows route');
    var showsView = new ClientApp.ShowsView({ model: this.model });
    this.swapView(showsView);
  },

  startShow: function() {
    console.log('start show');
    var that = this;
    var ip = this.model.get('ip');
    this.$el.fadeOut(1000, function() {
      var server = new Server({ ip: ip });
      var showView = new ClientApp.ShowView({ model: that.model, server: server });
      that.swapView(showView);
    });
  }

});