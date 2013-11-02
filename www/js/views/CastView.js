ClientApp.CastView = Backbone.View.extend({

  className: 'cast',
  
  initialize: function() {
    this.template = this.model.get('templates')['castList'];
    // get cast from remote server
    // set this cast to a cast collection
  },

  render: function() {
    
  }  

});