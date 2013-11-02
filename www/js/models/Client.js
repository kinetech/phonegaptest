window.Client = Backbone.Model.extend({

   // TODO : set up remote url on kine-tech.org
   // to receive get requests, and returns show info,
   // cast info for current show, upcoming shows,
   // etc

   initialize: function() {
     this.set('currentShow', 'Show Name');

   },

   getCastList: function() {
     this.trigger('castList', this);
   },

   getUpcomingShows: function() {
     this.trigger('shows', this);
   }

});