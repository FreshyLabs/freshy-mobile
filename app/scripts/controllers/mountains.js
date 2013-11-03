define([
  'application',
	'backbone',
  'views/collection/mountains',
  'collections/mountains'
],
function( App, Backbone, MountainsView, MountainsCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
      App.mountains_all = new MountainsCollection([]);
      App.mountains_all.getMountains( options );
		},

    show: function(){
      App.mainRegion.show( new MountainsView({})); //collection: App.mountains_all  }) );
    } 

	});

});
