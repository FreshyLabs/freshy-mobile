define([
  'application',
	'backbone',
  'views/item/mtn',
],
function( App, Backbone, MtnView ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Mtn Controller");

      //show the MtnView
      App.mountainRegion.show( new MtnView() );
		},
	});

});
