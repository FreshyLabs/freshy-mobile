if(typeof(d3Layer)=='undefined'){
  d3Layer = {};
}

(function () {
  
  d3Layer = {
    Marker: function( f ) {
      
        var attr = "current_new"; //TODO dynamic
        var open = ( f.properties.current_status === "open" ) ? true : false;
        
        var style = new d3Layer.customMarker(attr, f),
          radius = ( open ) ? style.radius : 4,
          marker = document.createElement("div");

        //Make an SVG Container
        var svg = d3.select(marker).append("svg")
          .attr("width", radius+(radius + 7))
          .attr("height", radius+(radius + 7))
          .attr('id', 'svg');

        //create circle
        var circle = svg.append("g")
          .selectAll("circle")
            .data([{properties:f.properties, radius:radius}])
          .enter().append("circle")
            .attr("stroke", "#FFF" )
            .attr("class", function(d) {
              if ( open ) {
                return "mtn";
              } else {
                return "mtn-closed"
              }
            })
            .attr('cx', radius + 3.5)
            .attr('cy', radius + 3.5)
            .attr('r', radius);
          

        if ( open ) {
          //this._calculateRadial( f, svg, radius );
        }

        var val = (this.metric) ? (f.properties[ attr ] * 2.54) : f.properties[ attr ];
        
        //hack to center marker font; resize if too small/too big
        var width, height, font_size;
        if ( !val || !open ) val = 0;
        val = parseFloat(val);
        switch ( true ) {
          case ( val === 0 ): 
            height = radius + 6;
            width = radius + 1.5;
            font_size = "5pt";
            break;
          case ( val <= 9 ):
            height = radius + 8;
            width = radius;
            font_size = '10pt';
            break;
          case ( val > 9 ):
            height = radius + 8;
            width = radius - 4;
            font_size = '10pt';
            break;
        }

        //add the text!
        var text = svg.append("g")
          .attr("class", "mtn-label")
        .selectAll("text")
          .data([{properties:f.properties, radius:radius}])
        .enter().append("text")
          .attr("dx", width)
          .attr("dy", height)
          .style('font-size', font_size)
          .text( (open) ? Math.ceil( val )+'' : '');
          
        marker.setAttribute('class', "mountain " + f.properties.Name.replace(/ /g,''));
         $(marker).data({properties:f.properties, radius:radius})
        
        return marker;
      
    },

    customMarker: function(type, data){
      var radius = 8, text = 12;
      if (type == 'current_new'){
        var snow = data.properties.current_new;
        if ( !snow ) snow = 0;
        switch (true) {
          case (snow == 0):  
            radius = 7;
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
      } else if (type == 'current_base'){
        var base = data.properties.current_base;
        switch( true ){
          case (base == 0):
            radius = 10;
            break;
          case (base <= 10):
            radius = 12;
            break;
          case (base <= 30):
            radius = 14;
            text = 13;
            break;
          case (base <= 50):
            radius = 16;
            text = 14;
            break;
          case (base > 50 && base < 75):
            radius = 18;
            text = 15;
            break;
          case (base >= 75 && base < 100):
            radius = 20;
            text = 16;
            break;
          case (base >= 100):
            radius = 25;
            text = 18;
            break;
          default:
            radius = 10;
        }
      } else if (type == 'current_forecast'){
        var forecast = data.properties.current_forecast;
        switch( true ){
          case (forecast == 0):
            radius = 6;
            break;
          case (forecast <= 2):
            radius = 10;
            break;
          case (forecast <= 3):
            radius = 13;
            text = 13;
            break;
          case (forecast <= 5):
            radius = 16;
            text = 14;
            break;
          case (forecast > 5 && forecast < 10):
            radius = 18;
            text = 14;
            break;
          case (forecast >= 10 && forecast < 15):
            radius = 20;
            text = 16;
            break;
          case (forecast >= 15):
            radius = 25;
            text = 18;
            break;
          default:
            radius = 6;
        }
      } else if (type == 'freshy_factor'){
        radius = 14;
        text = 13;
      }
      
      var marker = {
          radius: radius,
          text:text,
          fillColor: "#FFF",
          color: "#000",
          weight: 4,
          opacity: .45,
          fillOpacity: .9
      };
      return marker;
    }
  }

})();
