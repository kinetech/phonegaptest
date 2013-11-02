ClientApp.ShowsView = Backbone.View.extend({
  
  className: 'shows',

  initialize: function() {
    this.template = this.model.get('templates')['showsList'];
    // get cast from remote server
    // set this cast to a cast collection
  },

  render: function() {
    
  }

});