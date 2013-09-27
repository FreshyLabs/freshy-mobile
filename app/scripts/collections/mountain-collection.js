define([
  'application',
	'backbone',
	'models/mountain-model'
],
function( App, Backbone, MountainModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a MountainCollection collection");
		},

		model: MountainModel,

    getMountain: function( options ) {
      var self = this;
      
      if ( App.mountains_all.models.length === 0 ) {
        $.getJSON( "http://freshymap.com/mountains/"+options.id, function( data ) {
          var model = new MountainModel( data[0] );
          model.set( 'name',  data[0].feature.properties.Name.replace(/\s+/g, '') );

          //round forecast totals for UI display
          _.each(model.get('feature').properties.snow_forecast, function(total, i) {
            total.snow_amount = Math.round( total.snow_amount);
          });
          
          self.add( model );
        });
      } else {
        var model = App.mountains_all.findWhere( { name: options.id } );
        
        //round forecast totals for UI display
        _.each(model.get('feature').properties.snow_forecast, function(total, i) {
          total.snow_amount = Math.round( total.snow_amount);
        });

        this.add( model );

        $('#title').html(model.get('feature').properties.Name);
      }
    }
		
	});
});
