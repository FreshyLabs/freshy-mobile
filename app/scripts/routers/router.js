define([
  'backbone',
  'communicator',
  'controllers/mountain-controller',
  'controllers/closest-controller'
],
function( Backbone, Communicator, MtnController, ClosestController ) {
    'use strict';

  return Backbone.Router.extend({
    /* Backbone routes hash */
    initialize: function() {
      console.log('router initialized');
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
      console.log('route: "/#mountains/:id" ', id);
      this.mtnController = new MtnController();
    }


  });
});
