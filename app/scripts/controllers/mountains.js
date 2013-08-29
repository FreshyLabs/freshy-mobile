define([
  'application',
  'backbone',
  'views/collection/mountains',
  'collections/mountains'
],
function( App, Backbone, MountainsView, MountainsCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Mountains Controller");

      //populate the mountains controller
      var mountains = new MountainsCollection([]);
      mountains.fetch(); 

      //show the MountainsView
      App.mainRegion.show( new MountainsView({ collection: mountains  }) );
		}
	});

});