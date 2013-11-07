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

        var collection = {
          "type": "FeatureCollection",
          "features": points
        }

        $.each(points, function(i,point) {
          var marker = new d3Layer.Marker( point );
          
          var icon = L.divIcon({ 
              iconSize: new L.Point(10, 10), 
              html: $(marker).context.outerHTML
          });
          
          L.marker([point.properties.latitude, point.properties.longitude], { icon: icon }).addTo(App.map);

        });

        d3.selectAll('.mountain').on('click', function(e,i){
          var mtn = d3.select(this)[ 0 ][ 0 ].className.replace(/mountain /, ''); //hacky!
          
          App.router.navigate("#" + mtn, { trigger: true });
          var el = $('.main-container');
          el.show();
          //el.css('transform', 'translate3d(5%,0,0)');
          d3.event.stopPropagation();
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

        //tell the resqt of the app the data has loaded
        App.states = Object.keys(states).sort();
        App.execute( 'data:loaded' );

      } else {
        
        $.getJSON( "http://freshymap.com/data/mountains", function( data ) {
          
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
