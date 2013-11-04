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
      this.model.set(
        'updated', 
        dateFormat( this.model.get( 'feature' ).properties.report_time, "h:MM:ss TT")
      );
      var total = 0;
      _.each(this.model.get( 'feature' ).properties.snow_forecast, function(f){
        total += f.snow_amount;
      });
      console.log(total); 
      this.model.set( 'forecast', total );
  	},
		
    template: MtnTmpl,
    
    /* Ui events hash */
    events: {
      //"click": "expand",
      "click .close": "home"
    },

    hide: function(){
    },

    expand: function(){
      var el = $('.main-container');
      $('.main-container').css('transform', 'translate3d(5%,0,0)');
    },

    home: function() {
      $('.main-container').hide();
      App.router.navigate("#", { trigger: true });
    }

	});

});
