define([
  'backbone',
  'views/item/mountain'
],
function( Backbone, MountainItemView  ) {
  'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.CollectionView.extend({

    initialize: function() {
      var el = $('.main-container');
      el.show();
      //el.css('transform', 'translate3d(5%,0,0)');
      //$('#slides').css('transform', 'translate3d(' + pixelOffset + 'px,0,0)').removeClass();
    },

    itemView: MountainItemView,

    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {},

    onRender: function(){
      var self = this;
      setTimeout(function(){
        self._attachCams(self.collection.models[0].get('feature').properties.webcams);
      },750);
    },

    _attachCams: function( cams ){
      var el = $('.webcam-container .swiper-wrapper');
      _.each(cams, function(cam){
        console.log(cam)
        el.append("<img class='swiper-slide' src='"+cam+"'/>");
      });
      window.mySwiper = new Swiper('.swiper-container',{
          mode:'horizontal',
          loop: true
      });  
    }

  });

});
