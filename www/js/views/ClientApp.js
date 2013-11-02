window.ClientApp = Backbone.View.extend({
  
  className: "mainPage",

  initialize: function() {

    this.template = this.model.get('templates')['clientApp'];

    $('body').append(this.render().el);
    this.router = new ClientApp.Router({ el: this.$el.find('#container'), model: this.model });
//    this.router.on('route', this.updateNav, this);
    Backbone.history.start({pushstate:true});
    this.model.on('shows', this.showUpcomingShows, this);
    this.model.on('castList', this.showCastList, this);
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  showCastList: function() {
    this.router.navigate("/showCastList", { trigger: true });
  },

  showUpcomingShows: function() {
    this.router.navigate("/showUpcomingShows", { trigger: true });
  },

  showAlert: function (title, message) {
   // navigator.notification.alert(message, null, title, "OK!");
  }

});