if(typeof(d3Layer)=='undefined'){
  d3Layer = {};
}

(function () {
  
  d3Layer = {
    Layer: function( collection ) {
      
      //create new svg container
      //append graphic
      var svg = d3.select(App.map.getPanes().overlayPane).append("svg"),
        g = svg.append("g");

      //calculate bounds for outer extent of points
      var bounds = d3.geo.bounds(collection);
        
      //mountains
      //create circle elements for mountains, calculate radius
      var circle = g.selectAll('circle')
        .data( collection.features )
      .enter().append('circle')
        .attr('class', function(d) {
          if (d.properties.current_status === "closed" ) {
            return "mtn-closed";
          } else {
            return 'mtn';
          }
        })
        .attr("r", function(d) {
          var radus = getRadius( d.properties.current_new );
          if ( d.properties.current_status === "closed" ) radius = 4;
          return radius;
        });

      //marker labels 
      //TODO append these to circles somehow
      var text = g.selectAll('text')
          .data( collection.features )
        .enter().append('text')
          .attr('class', function(d) {
            if ( d.properties.current_status === "closed") {
              return 'mtn-label-closed';
            } else {
              return "mtn-label"
            }
          })
          .style('font-size', function(d) {
            var text = getTextSize( d.properties.current_new );
            if ( d.properties.current_status === "closed" ) text = 4;
            return text;
          })
          .text(function(d) {
            return d.properties.current_new;
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
      
        //reposition mountains 
        d3.selectAll("circle")
          .attr("cx", function(d) {
            return project([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
          })
          .attr("cy", function(d) {
            return project([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
          });
          //TODO radial
          //.attr('d', function(d) {
          //  calculateRadial(d);
          //});

        //reposition text labels
        d3.selectAll('.mtn-label')
          .attr("dx", function(d) {
            var offset = (d.properties.current_new > 1) ? 3 : 2;
            return project([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0] - offset;
          })
          .attr("dy", function(d) {
            var offset = (d.properties.current_new > 1) ? 3 : 2;
            return project([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1] + offset;
          });

      } 
     
      // Use Leaflet to implement a D3 geographic projection.
      function project(x) {
        var point = App.map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
        return [point.x, point.y];
      }

      /*
      * Calculate radius for new snow markers
      */
      function getRadius(snow) {
        if ( !snow ) snow = 0;
        switch (true) {
          case (snow == 0):  
            radius = 6;
            break;
          case (snow == 1):  
            radius = 10;
            break;
          case (snow <= 3):
            radius = 12;
            break;
          case (snow <= 5):
            radius = 14;
            break;
          case (snow <= 10):
            radius = 16;
            break;
          case (snow > 10 && snow < 15):
            radius = 19;
            break;
          case (snow >= 15 && snow < 20):
            radius = 23;
            break;
          case (snow >= 20):
            radius = 28;
            break;
          default:
            radius = 7;
        }
        return radius;
      }

       /*
      * Calculate text sizes
      */
      function getTextSize(val) {
        if ( !val ) val = 0;
        val = parseFloat(val);
        var text;

        switch ( true ) {
          case ( val === 0 ): 
            text = "5pt";
            break;
          case ( val <= 9 ):
            text = '10pt';
            break;
          case ( val > 9 ):
            text = '10pt';
            break;
        }
        return text;
      }

      //radial chart
      //;laksdjfa
      function calculateRadial( f ) {

        var ff = ( f.properties.freshy_factor > 10 ) ? f.properties.freshy_factor : 0;
        var pi = Math.PI;
        var τ = 2 * pi;

        var arc = d3.svg.arc()
          .innerRadius(radius + 2)
          .outerRadius(radius + 3.5)
          .startAngle(0 * (pi/180));
        
        var arcPath = svg.append("path")
          .datum({endAngle: 0})
          .attr('class', "radial-donut")
          .attr("transform", "translate("+project([f.geometry.coordinates[0], f.geometry.coordinates[1]])+")")
          .attr("d", arc);

        arcPath.transition()
            .duration(4000)
            .call(arcTween, (ff / 16 ));

        function arcTween(transition, newAngle) {
          transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function(t) {
              d.endAngle = interpolate(t);
              return arc(d);
            };
          });
        }

      }
    }
  }

})();
