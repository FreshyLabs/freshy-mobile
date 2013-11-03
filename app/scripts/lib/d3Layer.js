if(typeof(d3Layer)=='undefined'){
  d3Layer = {};
}

(function () {
  
  d3Layer = {
    addLayer: function( collection ) {
      
      //create new svg container
      //append graphic
      var svg = d3.select(App.map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide");

      //calculate bounds for outer extent of points
      var bounds = d3.geo.bounds(collection),
          path = d3.geo.path().projection(project).pointRadius(function (d) { 
            var radus = getRadius( d.properties.current_new );
            if ( d.properties.current_status === "closed" ) radius = 4;
            return radius;
          });
        
      //each point 
      //TODO add open/closed logic
      var feature = g.selectAll("path")
          .data(collection.features)
        .enter().append("path")
          .attr('class', function(d) {
            if ( d.properties.current_status === "closed" ) {
              return "mtn mtn-closed";
            } else {
              return "mtn";
            }
          });

      //bind to reset event for zooming
      App.map.on("viewreset", reset);
      
      //on initial load, reset
      reset();
     
      //position SVG on map
      function reset() {
        
        var bottomLeft = project(bounds[0]),
            topRight = project(bounds[1]),
            padding = 30; //add some extra padding! Fixes cut off points

        //apply that padding... 
        bottomLeft = [ bottomLeft[0] - padding, bottomLeft[1]+padding ];
        topRight = [ topRight[0]+padding, topRight[1]-padding ];
      
        svg.attr("width", topRight[0] - bottomLeft[0])
          .attr("height", bottomLeft[1] - topRight[1])
          .style("margin-left", bottomLeft[0] + "px")
          .style("margin-top", topRight[1] + "px").attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");
     
        g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");
     
        //update path ( points )
        feature.attr("d", path);
      }

      /*
      GET WORKING!
      svg.selectAll(".mtn-label")
        .data(collection.features)
      .enter().append("text")
        .attr("class", "mtn-label")
        .attr("transform", function(d) { return "translate(" + project([d.geometry.coordinates[0],d.geometry.coordinates[1]]) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return "10" });
      */

      // Use Leaflet to implement a D3 geographic projection.
      function project(x) {
        var point = App.map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
        return [point.x, point.y];
      }

      function addText() {
        
      }

      /*
      * Calculate radius for new snow markers
      */
      function getRadius(snow) {
        if ( !snow ) snow = 0;

        switch (true) {
        case (snow == 0):  
          radius = 6;
          text = 10;
          break;
        case (snow == 1):  
          radius = 10;
          break;
        case (snow <= 3):
          radius = 12;
          break;
        case (snow <= 5):
          radius = 14;
          text = 13;
          break;
        case (snow <= 10):
          radius = 16;
          text = 14;
          break;
        case (snow > 10 && snow < 15):
          radius = 19;
          text = 15;
          break;
        case (snow >= 15 && snow < 20):
          radius = 23;
          text = 16;
          break;
        case (snow >= 20):
          radius = 28;
          text = 18;
          break;
        default:
          radius = 7;
      }
      }
    }
  }

})();
