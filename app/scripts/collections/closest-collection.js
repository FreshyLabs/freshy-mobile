define([
  'application',
	'backbone'
],
function( App, Backbone ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Closest collection");
      var self = this;

      App.commands.setHandler('data:loaded', function() {
        self.getClosest();
      });

		},

    getClosest: function() {
      var self = this;
      
      //TODO replace res with actual keyed mountain from user location
      var res = App.mountains_all.models[ 90 ];
      var closest = res.get( 'feature' ).properties.closest;
      
      _.each( closest, function( name, i ) {
        var m = App.mountains_all.findWhere( { name: name.replace(/\s+/g, '') } );
        self.add( m );
      });
    
    }
		
	});
});
