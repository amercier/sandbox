$(function() {

  var width = config.width - config.margin.left - config.margin.right,
      height = config.height - config.margin.top - config.margin.bottom;

  // Scales
  var x = d3.time .scale ().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  d3.csv(config.data, function(error, data) {

    // Normalize data

    data.forEach(function(d) {
        d.Date = +d.Date;
        d.CpuUsed = d.CpuUsed === 'NAN' ? null : +d.CpuUsed / 1000;
      });


    // Update scale's domains

    x.domain(d3.extent(data, function(d) { return d.Date; }));
    y.domain(d3.extent(data, function(d) { return 1.3 * d.CpuUsed; }));


    window.reloadChart = function() {

      // SVG element

      var svg = d3.select(config.container).append('svg')
          .attr('width', width + config.margin.left + config.margin.right)
          .attr('height', height + config.margin.top + config.margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

      // Line

      var line = d3.svg.line()
          .defined(function(d) { return d.CpuUsed !== null; })
          .interpolate(config.options.interpolation)
          .x(function(d) { return x(d.Date); })
          .y(function(d) { return y(d.CpuUsed); });

      svg.append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', line)
          .style('stroke-width', config.options.thickness + 'px')
          .style('shape-rendering', config.options.shapeRendering);


      // X Axis

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')
          .tickSize(config.options.xAxisTickSize, config.options.xAxisSubTickSize, 0)
          .tickSubdivide(config.options.xAxisSubTicks);

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);


      // Y Axis

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
          .ticks(config.options.yAxisTicks)
          .tickSize(config.options.yAxisTickSize, config.options.yAxisSubTickSize, 0)
          .tickSubdivide(config.options.yAxisSubTicks);

      svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
        .append('text')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'start')
          .attr('dx', '.5em')
          .text('CPU used (GHz)');
    };

    reloadChart();

  });

});
