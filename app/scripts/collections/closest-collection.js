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
      console.log(' APP MOUNTAINS ALL COLLECTION ', App )
      var res = App.mountains[ 80 ].feature.properties;
      _.each(res.closest, function( name, i ) {
        var model = new ClosestModel();
        model.set('mountain', name);
        self.add( model );
      });
    
    }
		
	});
});
