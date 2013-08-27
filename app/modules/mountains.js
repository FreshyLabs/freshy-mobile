define([
  // Application.
  "app"
],

function(app) {
  Mountains = app.module();

  /*Mountains.Model = Backbone.Model.extend({
    defaults: function() {
      return {
        mountain: {}
      };
    }
  });*/

  Mountains.Collection = Backbone.Collection.extend({
    //model: Mountains.Model,

    cache: true,

    url: function() {
      return "http://freshymap.com/mountains";
    },

    /*fetch: function() {
      var self = this;
      $.getJSON(this.url(), function( data ) {
        $.each( data, function( i, mtn ) {
          var model = new Mountains.Model( mtn );
          self.add( model );
        });
        
      });
    },*/

    initialize: function(models, options) {
      //this.collection = new Mountains.Collection();

      //var mtns = this.fetch();
      //console.log('mudf')
      //if (options) {
      //  console.log('options', options)
      //}
    }
  });

  Mountains.Views.Item = Backbone.View.extend({
    initialize: function() {
      this.render();
    },
    serialize: function() {
      return { model: this.model };
    },
    template: "mountains/item",

    tagName: "li"

  });

  Mountains.Views.List = Backbone.View.extend({
    template: "mountains/list",

    beforeRender: function() {
      var self = this;
      console.log('before RENDER');
      
      setTimeout(function(){
      self.options.mountains.each(function( mtn ) {
        //console.log('mountain', mtn);
        self.insertView('ul.nav', new Mountains.Views.Item({
          model: mtn
        }));
      }, self);
      console.log('wtf', self.options.mountains);
      }, 2000);
    },

    serialize: function() {
      return {
        count: this.options.mountains.length
      };
    },
    initialize: function() {
       this.listenTo(this.options.mountains, {
        "reset": this.render,

        "fetch": function() {
          //this.$("ul").parent().html("<img src='/app/img/spinner.gif'>");
        }
      });

    }
  });

  // Required, return the module for AMD compliance.
  return Mountains;

});
