define([
	'application',
  'backbone',
  'views/collection/closest-collection-view',
  'collections/closest-collection'
],
function( App, Backbone, MountainsView, ClosestCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Closest Controller");

       //populate the mountains controller
      if ( !App.closest ) {
        App.closest = new ClosestCollection([]);
      }

      //show the MountainsView
      App.mainRegion.show( new MountainsView({ collection: App.closest  }) );
		}
	});

});
