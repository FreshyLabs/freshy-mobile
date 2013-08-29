define([
  'backbone',
  'communicator',
  'controllers/mountains'
],
function( Backbone, Communicator, MountainsController ) {
    'use strict';

  return Backbone.Router.extend({
    /* Backbone routes hash */
    initialize: function() {
      console.log('router initialized');
      this.controller = new MountainsController();
    },

    routes: {
      "": "show"
    },

    show: function() {
      console.log('route: "" get all mountains: ');
      this.controller.initialize();
      //get all the mountains
      //var mountains = new MountainsCollection([]);
      //mountains.fetch();

    }


  });
});
