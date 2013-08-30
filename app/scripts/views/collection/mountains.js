define([
	'backbone',
	'views/item/mountain'
],
function( Backbone, Mountain  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.CollectionView.extend({

		initialize: function() {
      var self = this;
			console.log("initialize a Mountains CollectionView", this);
      //this.collection.on('sort', function() {
      //  self.render();
      //});
		},
		
    itemView: Mountain,
    	
    /* ui selector cache */
    ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
