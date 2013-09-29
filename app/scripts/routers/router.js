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
      this.closestController = new ClosestController();
      this.mtnController = new MtnController( );
    },

    routes: {
      "": "renderClosest",
      "/#": "renderClosest",
      ":id": "renderMountain"
    },

    renderClosest: function() {
      console.log('route: "Closest" ');
      //closest mountains 
      this.closestController.show();
    },

    renderMountain: function( id ) {
      var options = {};
      options.id = id; //mountain name 
      this.mtnController.mountain.getMountain( options ); 
      this.mtnController.show();
    }


  });
});
