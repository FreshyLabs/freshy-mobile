define([
  'application',
	'backbone'
],
function( App, Backbone ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			App.vent.on('update:focus:mountain', this.getClosest, this);
		},

    getClosest: function( mountain ) {
      
      var self = this;
      
      this.reset();

      var res, closest;
      if ( !mountain ) {
        res = App.mountains_all.models[ 80 ];
        res.set('index', 4);
        closest = res.get( 'feature' ).properties.closest;
      } else {
        res = mountain;
        res.set('index', 4);
        closest = mountain.get( 'feature' ).properties.closest;
      }

      App.activeMountain = res; //for navigation, keep track of which mountain is 'active'

      for (var i = 0; i<8; i++ ) {

        if ( i === 4 ) self.add( res ); // stuff the selected mountain in the middle of array
        var m = App.mountains_all.findWhere( { name: closest[ i ].replace(/\s+/g, '') } );
        m.set('index', null);
        self.add( m );

      };

    }
		
	});
});
