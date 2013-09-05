define([
  'application',
	'backbone',
	'models/mountain-model'
],
function( App, Backbone, MountainModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a MountainCollection collection");
		},

		model: MountainModel,

    getMountain: function( options ) {
      var self = this;
      
      var model = App.mountains_all.findWhere( { name: options.id } );
      this.add( model );
    }
		
	});
});
