define([
	'backbone',
	'communicator',
	'views/item/mountains',
  'models/mountains'
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
		App.mainRegion.show( new MountainsView({ model: new Mountains }) );
		Communicator.mediator.trigger("APP:START");
	});

	return App;
});
