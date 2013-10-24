define([
	'backbone',
	'views/item/mountains'
],
function( Backbone, Mountain  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.CollectionView.extend({

		initialize: function() {
      var self = this;
			console.log("initialize a Mountains CollectionView");
      //this.collection.on('sort', function() {
      //  self.render();
      //});
		},
		
    itemView: Mountain,
    	
    /* ui selector cache */
    ui: {},

		/* Ui events hash */
		events: {
    },

		/* on render callback */
		onRender: function() {
      $('#header').show();
      $('.search .typeahead').typeahead({                                   
              name: 'states',                                                             
              local: [
                'Colorado',
                'Cali'
              ]                                                                           
            });

    }
	});

});
