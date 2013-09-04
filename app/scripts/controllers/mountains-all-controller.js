define([
  'application',
	'backbone',
  'collections/mountains-all-collection'
],
function( App, Backbone, MountainsAllCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a MountainsAllController Controller");

      App.mountains_all = new MountainsAllCollection([]);
      App.mountains_all.add( App.mountains );

		}
	});

});
