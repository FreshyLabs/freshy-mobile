define([
	'application',
  'backbone',
  'views/collection/closest-collection-view',
  'collections/closest-collection'
],
function( App, Backbone, MountainsView, ClosestCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Closest Controller");
      var self = this;

      this.closest = new ClosestCollection([]);
      
      if ( App.mountains_all.models.length === 0 ) {
        App.commands.setHandler('data:loaded', function() {
          self.closest.getClosest();
        });
      } else {
        this.closest.getClosest();
      }

      this.show();
      
    },

    show: function() {
      App.mainRegion.show( new MountainsView({ collection: this.closest  }) );
    }
	});

});
