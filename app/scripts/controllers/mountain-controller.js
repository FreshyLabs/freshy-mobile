define([
  'application',
	'backbone',
  'views/collection/mountain-collection-view',
  'collections/mountain-collection'
],
function( App, Backbone, MtnCollectionView, MountainCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Mtn Controller");
      var self = this;

      //get mountain 
      this.mountain = new MountainCollection([]);
      this.mountain.getMountain( options ); 

      var mountainItems = { 
        "back" : "back"
      }

      this.mountain.push( mountainItems );

      this.show();
		},

    show: function() {
      App.mountainRegion.show( new MtnCollectionView( { collection : this.mountain } ) );
    }

	});

});
