define([
  'application',
	'backbone',
	'hbs!tmpl/item/mtn_tmpl'
],
function( App, Backbone, MtnTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function( options ) {
			console.log("initialize a Mtn ItemView");
  	},
		
    template: MtnTmpl,
    
    /* Ui events hash */
    events: {
      "click #selected-mountain" : "home"
    },


    home: function() {
      App.router.navigate("#", { trigger: true });
    },

   	/* on render callback */
		onRender: function() {}
	});

});
