define([
  'backbone',
  'views/item/mountain'
],
function( Backbone, MountainItemView  ) {
  'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.CollectionView.extend({

    initialize: function() {
      console.log("initialize a MountainCollectionView CollectionView");
    },

    itemView: MountainItemView,

    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {},

    /* on render callback */
    onRender: function() {}
  });

});
