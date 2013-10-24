define([
  'application',
	'backbone',
  'models/mountains-all-model'
],
function( App, Backbone, MountainsAllModel ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a MountainsAllCollection collection");
    },

    model: MountainsAllModel,

    addLayer: function( points ){
        var style = {
          radius: 4,
          fillColor: "#333",
          color: "#ddd",
          weight: 2,
          opacity: .7,
          fillOpacity: 0.8
        };

        App.layer = L.geoJson(points, {
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, style);
          }
        }).addTo(App.map);

        App.layer.on('click', function(e) {
          App.router.navigate("#"+e.layer.feature.properties.Name, { trigger: true });
          var el = $('.main-container');
          el.show(function(){
            el.css('left', '5%');
          });
        });
    },

    getMountains: function() {
      var self = this;

      var now = new Date().getTime();
      var states = {};
      var expire = parseFloat( localStorage.getItem( 'expire' ) );
      
      if ( now > expire ) {
        localStorage.clear();
      }
       
      var points = [];

      if ( localStorage.mountains )  {
        
        var data = JSON.parse( localStorage.getItem('mountains') );
        _.each( data, function( mtn, i ) {
          states[mtn.feature.properties.State] = states[mtn.feature.properties.State]+1 || 1;
          var model = new MountainsAllModel( mtn );
          model.set( 'name',  mtn.feature.properties.Name.replace(/\s+/g, '') );
          model.set( 'index', i);
          self.add( model );

          // add to map
          if (mtn.feature.geometry.coordinates[0] && mtn.feature.geometry.coordinates[1]){ 
           var geojson = {type:'Feature', geometry: {type:'Point', coordinates: mtn.feature.geometry.coordinates}, properties: mtn.feature.properties};
           //App.mntLayer.addData( geojson );
            points.push( geojson );
          }
        });

        self.addLayer( points );

        //tell the rest of the app the data has loaded
        App.states = Object.keys(states).sort();
        App.execute( 'data:loaded' );

      } else {
        
        $.getJSON( "http://freshymap.com/mountains", function( data ) {
          
          _.each( data, function( mtn, i ) {
            states[mtn.feature.properties.State] = states[mtn.feature.properties.State]+1 || 1;
            var model = new MountainsAllModel( mtn );
            model.set( 'name',  mtn.feature.properties.Name.replace(/\s+/g, '') );
            model.set( 'index', i);
            self.add( model );

            // add to map
            if (mtn.feature.geometry.coordinates[0] && mtn.feature.geometry.coordinates[1]){
              var geojson = {type:'Feature', geometry: {type:'Point', coordinates: mtn.feature.geometry.coordinates}, properties:mtn.feature.properties};
              //App.mntLayer.addData( geojson );
              points.push( geojson );
            }
          });

          self.addLayer( points );

          //tell the rest of the app the data has loaded
          App.states = Object.keys(states).sort();
          App.execute( 'data:loaded' );

          //expire localStorage after 45 minutes
          var expire = new Date().getTime() + 2700000;
          
          localStorage.setItem( 'expire', expire );
          localStorage.setItem( 'mountains', JSON.stringify( data ) );
          
        });
      }
    }

	});
});
