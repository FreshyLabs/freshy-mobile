define([
  'backbone',
  'communicator',
  'controllers/mountains',
  'controllers/mountain',
],
function( Backbone, Communicator, MountainsController, MtnController ) {
    'use strict';

  return Backbone.Router.extend({
    /* Backbone routes hash */
    initialize: function() {
      console.log('router initialized');

      //setup all mountains collection used globally across app
      this.mountainsController = new MountainsController();
      this.mountainController = new MtnController( );
      console.log('MOUNTAIN', this.mountainController);
    },

    routes: {
      "": "renderAll",
      "/#": "renderAll",
      ":id": "renderMountain"
    },

    renderAll: function() {
      this.mountainsController.show();
    },

    renderMountain: function( id ) {
      var options = {};
      options.id = id; //mountain name 
      this.mountainController.show( options );
    }


  });
});
