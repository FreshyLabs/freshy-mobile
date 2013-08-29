define([
	'backbone',
	'communicator',
	'views/item/mountains',
  'collections/mountains'
],

function( Backbone, Communicator, MountainsView, Mountains ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
    mainRegion: "#main"
  });

	/* Add initializers here */
	App.addInitializer( function () {
		App.mainRegion.show( new MountainsView({ collection: new Mountains  }) );
		Communicator.mediator.trigger("APP:START");
	});

	return App;
});
