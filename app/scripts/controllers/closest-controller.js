define([
	'application',
  'backbone',
  'views/collection/closest-collection-view',
  'collections/closest-collection'
],
function( App, Backbone, MountainsView, ClosestCollection ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Closest Controller");
      var self = this;

      App.on('locate', this.setLocation, this);

      this.closest = new ClosestCollection([]);
      
      if ( App.mountains_all.models.length === 0 ) {
        App.commands.setHandler('data:loaded', function() {
          self.closest.getClosest();
        });
      } else {
        //this.closest.getClosest( App.activeMountain );
      }

      this.show();

    },

    show: function() {
      App.mainRegion.show( new MountainsView({ collection: this.closest  }) );
    },

     setLocation: function( geo ){
      if ( geo ){
        var coords = geo.coords;
        this.closest.getClosest( this._findNearest( coords.latitude, coords.longitude ) );
      } else {
        this.closest.getClosest( App.activeMountain );
      }
    },

    // compute the distance from each mountain
    _findNearest: function(lat, lon){
      var nearest, min_dist = 100000, dist, coords, self = this;
      _.each(App.mountains_all.models, function(mtn){
        coords = mtn.get('feature').geometry.coordinates;
        dist = self._distance(lat, lon, coords[1], coords[0]);
        if (dist < min_dist){
          nearest = mtn;
          min_dist = dist;
        }
      });
      return nearest;
    },

    _distance: function(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this._deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this._deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    },

    _deg2rad: function(deg) {
      return deg * (Math.PI/180)
    }

	});

});
