define([
  'application',
	'backbone',
	'hbs!tmpl/item/closest_tmpl'
],
function( App, Backbone, MountainTmpl  ) {
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
		events: {
      "click .mountains[data-index!='4']": "updateFocusMountain",
      "click .mountains[data-index='4']": "mountainSelected"
    },

    updateFocusMountain: function( e ) {
      App.vent.trigger('update:focus:mountain', this.model);
    },

    mountainSelected: function() {
      var name = this.model.get( 'feature' ).properties.Name;
      name = name.replace(/\s+/g, '');
      App.router.navigate("#"+name, { trigger: true });
    },

		/* on render callback */
		onRender: function() {}
	});

});
