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
  App.map = L.map('map').setView([40, -105], 4);
  
  App.map.options.maxZoom = 8;
  App.map.options.minZoom = 3;

  L.tileLayer('http://freshymap.com/tiles/{y}/{x}/{z}.png', {}).addTo(App.map);

  App.map.locate({setView: true, maxZoom: 4});

  App.map.on('click', function(){
    App.router.navigate("#", { trigger: false });
    $('.main-container').hide();
    //$('.main-container').css('transform', 'translate3d(100%,0,0)');
  });

  $('#title').on('click', function(){
    $('.main-container').hide();
  });

  return App;
});
