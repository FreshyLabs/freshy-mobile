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
      
      //TODO lookup without loop!
      _.each( App.mountains, function( mtn, i ) {
        if ( mtn.feature.properties.Name.replace(/\s+/g, '') === options.id ) {
          var model = new MountainModel( mtn );
          self.add( model );
        }  
      });
    }
		
	});
});
