define([
  'backbone',
  'communicator',
  'controllers/mountains',
  'controllers/mtn'
],
function( Backbone, Communicator, MountainsController, MtnController ) {
    'use strict';

  return Backbone.Router.extend({
    /* Backbone routes hash */
    initialize: function() {
      console.log('router initialized');
    },

    routes: {
      "": "show",
      "mountains/:id": "renderMountain"
    },

    show: function() {
      console.log('route: "" get all mountains: ');
      this.controller = new MountainsController();
    },

    renderMountain: function( id ) {
      console.log('route: "/#mountains/:id" ', id);
      this.mtnController = new MtnController();
    }


  });
});
