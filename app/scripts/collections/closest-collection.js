define([
  'application',
	'backbone',
	'models/closest-model'
],
function( App, Backbone, ClosestModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Closest collection");
		},

		model: ClosestModel,

    getClosest: function() {
      var self = this;

      //TODO use real 'closest' mountain
      var res = App.mountains[ 80 ].feature.properties;
      _.each(res.closest, function( mtn, i ) {
        var model = new ClosestModel();
        model.set('mountain', mtn);
        self.add( model );
      });
    
    }
		
	});
});
