ClientApp.Router = Backbone.Router.extend({
  
  initialize: function(options) {
    this.$el = options.el;
    this.model = options.model;
  },

  routes: {
    "": "index",
    "showCastList": "showCastList",
    "showUpcomingShows": "showUpcomingShows",
  },
  
  swapView: function(view) {
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
    console.log('shows route');
    var showsView = new ClientApp.ShowsView({ model: this.model });
    this.swapView(showsView);
  }

});