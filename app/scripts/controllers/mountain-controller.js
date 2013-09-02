define([
  'application',
	'backbone',
  'views/item/mountain-item-view',
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
