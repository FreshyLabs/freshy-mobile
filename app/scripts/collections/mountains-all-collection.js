define([
  'application',
	'backbone',
  'models/mountains-all-model'
],
function( App, Backbonel, MountainsAllModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a MountainsAllCollection collection");
		},

    model: MountainsAllModel,

    getMountains: function() {
      var self = this;

      _.each(App.mountains, function( mtn, i ) {
        var model = new MountainsAllModel( mtn );
        self.add( model );
      });
    
    }

	});
});
