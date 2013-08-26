define([
  // Application.
  "app",

  // Modules.
  "modules/mountains"
],

function(app, Mountains) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      // TODO Clean this up...
      var collections = {
        // Set up the mountains.
        mountains: new Mountains.Collection([]),
      };

      collections.mountains.fetch();
      // Ensure the router has references to the collections.
      _.extend(this, collections);

      // Use main layout and set Views.
      app.useLayout("main-layout").setViews({
        "#mountains": new Mountains.Views.List( collections )
      }).render();
    },

    routes: {
      "": "index",
    },

    index: function() {
      // Reset the state and render.
      this.reset();
    },

    org: function(name) {
      
    },

    user: function(org, name) {
      
    },

    repo: function(org, user, name) {
      
    },

    // Shortcut for building a url.
    go: function() {
      
    },

    reset: function() {
      
    }
  });

  // Required, return the module for AMD compliance.
  return Router;

});