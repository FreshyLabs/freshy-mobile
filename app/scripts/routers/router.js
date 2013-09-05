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

      //setup all mountains collection used globally across app
      this.mtnsall = new MountainsAllController();
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
      options.id = id; //mountain name 
      this.mtnController = new MtnController( options );
    }


  });
});
