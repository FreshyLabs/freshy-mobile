define([
  // Application.
  "app"
],

function(app) {
  var Mountains = app.module();

  Mountains.Model = Backbone.Model.extend({
    defaults: function() {
      return {
        mountain: {}
      };
    }
  });

  Mountains.Collection = Backbone.Collection.extend({
    model: Mountains.Model,

    cache: true,

    url: function() {
      return "http://freshymap.com/mountains";
    },

    fetch: function() {
      var self = this;
      $.getJSON(this.url(), function( data ) {
        $.each( data, function( i, mtn ) {
          var model = new Mountains.Model( mtn );
          self.add( model );
        });
        
      });
    },

    initialize: function(models, options) {
      //this.collection = new Mountains.Collection();

      //var mtns = this.fetch();
      console.log('mudf')
      //if (options) {
      //  console.log('options', options)
      //}
    }
  });

  Mountains.Views.Item = Backbone.View.extend({
    initialize: function() {
      this.render();
    },
    template: "mountains/list",

    tagName: "tr"

  });

  Mountains.Views.List = Backbone.View.extend({
    tagName: "table",
    beforeRender: function() {
      var self = this;
      
      setTimeout( function() {
        self.options.mountains.each(function( mountain  ) {
          console.log('mountain', mountain)
          self.insertView(new Mountains.Views.Item({
            collection: mountain
          }));
        }, self);
      },50);
    },
    initialize: function() {

    }
  });

  // Required, return the module for AMD compliance.
  return Mountains;

});