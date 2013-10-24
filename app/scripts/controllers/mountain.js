define([
  'application',
	'backbone',
  'views/collection/mountain',
  'collections/mountain-collection'
],
function( App, Backbone, MtnView, MountainCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( ) {
			console.log("initialize a Mtn Controller");
      var self = this;

      //get mountain 
      this.collection = new MountainCollection([]);
		},

    show: function( options ) {
      this.collection.getMountain( options ); 
      App.mountainRegion.show( new MtnView( { collection : this.collection } ) );
    }

	});

});
