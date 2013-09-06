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
          console.log('model', model)
          self.add( model );
        });
      } else {
        var model = App.mountains_all.findWhere( { name: options.id } );
        this.add( model );
      }
    }
		
	});
});
