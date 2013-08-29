define([
  'backbone',
  'models/mountains'
],
function( Backbone, MountainsModel ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a Mountains collection");
    },

    model: MountainsModel,

    url: function() {
      return "http://freshymap.com/mountains";
    },

    fetch: function() {
      var self = this;
      $.getJSON(this.url(), function( data ) {
        $.each( data, function( i, mtn ) {
          var model = new MountainsModel( mtn );
          self.add( model );
          console.log('add mountain to collection: ', model);
        });

      });
    }

  });
});
