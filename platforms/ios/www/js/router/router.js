ClientApp.Router = Backbone.Router.extend({
  
  initialize: function(options) {
    this.$el = options.el;
    this.links = new Shortly.Links();
  },

  routes: {
    "": "index",
    "sortByNewest": "renderNewest",
    "sortByMostVis": "renderMostVis",
    "sortByLastVis": "renderLastVis"
  },
  
  index: function(){
    var linksView = new Shortly.LinksView( {collection: this.links} );
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.html( linksView.render().el );
    this.$el.find('.shortLinkBar').html( linkCreateView.render().el );
  },

  renderNewest: function() {
    this.links.sortByNewest();
  },

  renderMostVis: function() {
    this.links.sortByMostVis();
  },

  renderLastVis: function() {
    this.links.sortByLastVis();
  }
});