define([
	'backbone',
  'communicator',
  'hbs!tmpl/welcome',
  'collections/mountains'
],
function( Backbone, Communicator, Welcome_tmpl, MountainsCollection ) {
    'use strict';

	return Backbone.Router.extend({
		/* Backbone routes hash */
    initialize: function() {
      console.log('router initialized');
    },

		routes: {
      "": "showAll"
    },

    showAll: function() {
      console.log('route: "" get all mountains: ');

      //get all the mountains
      var mountains = new MountainsCollection([]);
      mountains.fetch();

    }


	});
});
