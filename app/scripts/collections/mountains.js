define([
  'backbone',
  'models/mountains'
],
function( Backbone, MountainsModel ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a Mountains collection", this);
    },

    model: MountainsModel,

    url: function() {
      return "http://freshymap.com/mountains";
    },

    fetch: function() {
      var self = this;
      $.getJSON(this.url(), function( data ) {
        //TODO for not limit to 9
        var i = 0;
        $.each( data, function( i, mtn ) {
          i++;
          var model = new MountainsModel( mtn );
          //console.log('model', model)
          self.add( model );

          if ( i === 9 ) { return false; }
          
        });
      });
      
      //self.sort();
    },

    comparator: function( model ) {
      return model.get( 'feature' ).properties.Name.toLowerCase();
    }

  });
});
