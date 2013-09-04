define([
  'backbone',
  'communicator',
  'controllers/mountains-all-controller',
  'controllers/mountain-controller',
  'controllers/closest-controller'
],
function( Backbone, Communicator, MountainsAllController, MtnController, ClosestController ) {
    'use strict';

  return Backbone.Router.extend({
    /* Backbone routes hash */
    initialize: function() {
      console.log('router initialized');

      //setup all mountains collection
      this.mtsall = new MountainsAllController();
    },

    routes: {
      "": "renderClosest",
      "mountains/:id": "renderMountain"
    },

    renderClosest: function() {
      console.log('route: "" ');

      //closest mountains 
      this.closestController = new ClosestController();
    },

    renderMountain: function( id ) {
      var options = {};
      options.id = id;
      this.mtnController = new MtnController( options );
    }


  });
});
