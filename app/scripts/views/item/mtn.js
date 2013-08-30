define([
	'backbone',
	'hbs!tmpl/item/mtn_tmpl'
],
function( Backbone, MtnTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Mtn ItemView");
		},
		
    	template: MtnTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
