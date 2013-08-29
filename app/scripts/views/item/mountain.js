define([
	'backbone',
	'hbs!tmpl/item/mountain_tmpl'
],
function( Backbone, MountainTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Mountain ItemView");
		},
		
    	template: MountainTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
