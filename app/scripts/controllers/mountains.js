define([
	'backbone',
  'collections/mountains'
],
function( Backbone, MountainsCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Mountains Controller");
      var mountains = new MountainsCollection([]);
      mountains.fetch(); 
		}
	});

});
