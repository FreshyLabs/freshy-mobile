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
        // default to a mountain (34 == mt spokane)
        res = App.mountains_all.models[ 34 ];
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
        if ( m.get('feature').properties.current_new == null ) m.get('feature').properties.current_new = 0;
        self.add( m );

        $('#title-inner').html('FreshyMap');
      };

      //TODO FIX
      //ANIMATION HACK 
      setTimeout(function() {
      //css update for focus container 
        $('.mountains-new-snow[data-index="4"]').css({
          'margin-top':'-5px',
          'height':'70px', 
          'width': '70px', 
          'font-size':'1em'
        });
      },100);
      
    }
	});
});
