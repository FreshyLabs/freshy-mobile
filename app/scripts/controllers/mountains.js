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
      this.collection = new MountainsCollection([]);
      this.collection.fetch(); 

      //show the MountainsView
      App.mainRegion.show( new MountainsView({ collection: this.collection  }) );

      console.log(this.collection);
		}
	});

});
