define([
  // Application.
  "app",

  // Modules.
  "modules/mountains"
],

function(app, Mountains) {

  // Defining the application router, you can attach sub routers here.
  Router = Backbone.Router.extend({
    initialize: function() {
      // TODO Clean this up...
      var collections = {
        // Set up the mountains.
        mountains: new Mountains.Collection(),
      };

      // Ensure the router has references to the collections.
      _.extend(this, collections);

      // Use main layout and set Views.
      app.useLayout("main-layout").setViews({
        ".mountains": new Mountains.Views.List( collections )
      }).render();
    },

    routes: {
      "": "index",
    },

    index: function() {
      // Reset the state and render.
      this.reset();
      //this.mountains.fetch();
    },

    reset: function() {
      if (this.mountains.length) {
        this.mountains.reset();
      }
    }
  });

  // Required, return the module for AMD compliance.
  return Router;

});
