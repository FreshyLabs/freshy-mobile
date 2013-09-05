define([
  'application',
	'backbone',
  'models/mountains-all-model'
],
function( App, Backbone, MountainsAllModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a MountainsAllCollection collection");
		},

    model: MountainsAllModel,

    getMountains: function() {
      var self = this;

      $.getJSON( "http://freshymap.com/mountains", function( data ) {
        
        _.each( data, function( mtn, i ) {
          var model = new MountainsAllModel( mtn );
          model.set( 'name',  mtn.feature.properties.Name.replace(/\s+/g, '') );
          self.add( model );
        });

        //tell the rest of the app the data has loaded
        App.execute( 'data:loaded' );
        
      });
    }

	});
});
