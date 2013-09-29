define([
  'application',
	'backbone',
  'views/collection/mountain-collection-view',
  'collections/mountain-collection'
],
function( App, Backbone, MtnCollectionView, MountainCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( ) {
			console.log("initialize a Mtn Controller");
      var self = this;

      //get mountain 
      this.mountain = new MountainCollection([]);
      //this.show();
		},

    show: function( options ) {
      App.mountainRegion.show( new MtnCollectionView( { collection : this.mountain } ) );
    }

	});

});
