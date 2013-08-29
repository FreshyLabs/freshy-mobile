define([
	'backbone',
	'hbs!tmpl/item/mountains_tmpl'
],
function( Backbone, MountainsTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Mountain ItemView");
		},
		
    	template: MountainsTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
