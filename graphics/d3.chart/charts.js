var max, width = 700;

// define a new chart type: a circle chart
d3.chart('CircleChart', {

  initialize: function() {
    // create a layer of circles that will go into
    // a new group element on the base of the chart
    this.layer('circles', this.base.append('g'), {

      // select the elements we wish to bind to and
      // bind the data to them.
      dataBind: function(data) {
        return this.selectAll('circle')
          .data(data);
      },

      // insert actual circles
      insert: function() {
        return this.append('circle');
      },

      // define lifecycle events
      events: {

        // paint new elements, but set their radius to 0
        // and make them red
        'enter': function() {
          console.log('enter', this[0].length);
          for(var i = 0 ; i < this[0].length ; i++) {
            console.log('   - ', this[0][i]);
          }
          return this
            .attr('cy', 20)
            .attr('r', 0)
            .style('fill', 'indigo');
        },

        'update': function() {
          console.log('update', this[0].length);
          for(var i = 0 ; i < this[0].length ; i++) {
            console.log('   - ', this[0][i]);
          }
        //   return this
        //     .style('fill', '#380067');
        },

        'merge': function() {
          console.log('merge', this[0].length);
          for(var i = 0 ; i < this[0].length ; i++) {
            console.log('   - ', this[0][i]);
          }
        },

        'merge:transition': function() {
          return this
            .attr('cx', function(d) {
              return 16 + d * (width - 32) / max;
            })
            .attr('r', 200 / max)
            .style('fill', '#4aa4e1');
        },

        // make old elements grey with radius 3
        'exit': function() {
          console.log('exit', this[0].length);
          for(var i = 0 ; i < this[0].length ; i++) {
            console.log('   - ', this[0][i]);
          }
          return this
            .style('fill', '#ccc');
        }
      }
    });
  }
});

$(window).ready(function() {

  // create an instance of the chart on a d3 selection
  var chart = d3.select('.chart-bullet')
    .append('svg')
    .attr('height', 40)
    .attr('width', width)
    .chart('CircleChart');

  // render it with some data
  max = 13;
  chart.draw([0,1,4,6,9,12,13]);

  setTimeout(function() {
    max = 30;
    chart.draw([2,4,7,8,9,12,14,15,18]);
  }, 1500);

  setTimeout(function() {
    max = 50;
    chart.draw([2,4,7,8,9,12,14,15,18,50]);
  }, 3000);

});
