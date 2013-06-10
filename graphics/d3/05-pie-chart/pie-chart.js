$(function() {

  var width = 700;

  var color = d3.scale.ordinal();
  //    .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

  d3.csv(config.data, function(error, data) {

    data.forEach(function(d) {
      d.CpuUsed = +d.CpuUsed;
    });

    var data2 = [
        { name: 'Used'  , value: data[0].CpuUsed },
        { name: 'Unused', value: data[0].CpuLimit - data[0].CpuUsed }
      ];

    window.reloadChart = function() {

      var arc = d3.svg.arc()
          .outerRadius(+config.options.outerRadius/* - 10*/)
          .innerRadius(+config.options.innerRadius);

      var height = 2 * +config.options.outerRadius + 2 * (config.options.border && config.options.thickness || 0) + 1;

      var svg = d3.select(config.container).append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      var g = svg.selectAll('.arc')
          .data(pie(data2))
        .enter().append('g')
          .attr('class', 'arc');

      g.append('path')
          .attr('d', arc)
          .style('shape-rendering', config.options.shapeRendering)
          .style('stroke-width', config.options.thickness)
          .attr('class', function(d) { return 'pie-slice pie-slice-' + d.data.name.toLowerCase() + (config.options.border ? ' pie-slice-border' : ''); });

      // Swap 2 areas
      $('.pie-slice-used').before($('.pie-slice-unused'));
    };

    reloadChart();

  });

});
