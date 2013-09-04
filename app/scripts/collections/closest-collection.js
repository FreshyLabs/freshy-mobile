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

      //TODO create lookup on "mountains_all" for mountain model, not just NAME!
      console.log(' APP MOUNTAINS ALL COLLECTION ', App.mountains_all );

      var res = App.mountains[ 80 ].feature.properties;
      _.each(res.closest, function( name, i ) {
        var model = new ClosestModel();
        model.set('mountain', name);
        self.add( model );
      });
    
    }
		
	});
});
