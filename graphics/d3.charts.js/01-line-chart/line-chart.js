$(function () {



	var chart = new Chart.ContinuousTimeChart({
      // margins, ....
      getTime: function(d) {
        return 1000 * +d.Date; // Converts a UNIX timestamp into a Javascript timestamp
      }
    })
    .addXAxis({

    })
    .addYAxis({

    })
    .addLine({
        getValue: function(d) {
          return +d[fieldName];
        },
        class: 'line'
      })
    .render( document.getElementsByClassName('chart-container')[0] );

});
