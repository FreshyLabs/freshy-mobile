window.App;

define([
  'backbone',
	'communicator'
],

function( Backbone, Communicator, MountainsView, Mountains ) {
  'use strict';

  window.App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
    mainRegion: "#main",
    headerRegion: "#header",
    mountainRegion: "#main" //TODO make unique
  });

	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger("APP:START");
	});

  $('#map').css('height', document.height);
  App.map = L.map('map').setView([-105, 45], 10);
  L.tileLayer('http://freshymap.com/tiles/{y}/{x}/{z}.png', {}).addTo(App.map);

  App.map.locate({setView: true, maxZoom: 4});

  App.map.on('click', function(){
    App.router.navigate("#", { trigger: false });
    $('.main-container').css('transform', 'translate3d(100%,0,0)');
  });

  return App;
});
