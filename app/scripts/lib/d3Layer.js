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
          path = d3.geo.path().projection(project).pointRadius(function (d) { return 6 });
        
      //each point 
      //TODO add open/closed logic
      var feature = g.selectAll("path")
          .data(collection.features)
        .enter().append("path")
          .attr('class', "mtn");
     
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
     
      // Use Leaflet to implement a D3 geographic projection.
      function project(x) {
        var point = App.map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
        return [point.x, point.y];
      }
    }
  }

})();