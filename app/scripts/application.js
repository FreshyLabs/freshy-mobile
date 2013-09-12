define([
  'fastclick',
	'backbone',
	'communicator',
],

function( FastClick, Backbone, Communicator, MountainsView, Mountains ) {
  'use strict';

  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);

  var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
    mainRegion: "#main",
    mountainRegion: "#main" //TODO make unique
  });

	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger("APP:START");
	});

  return App;
});
