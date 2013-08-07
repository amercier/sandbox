$(function() {

  var width = config.width - config.margin.left - config.margin.right,
      height = config.height - config.margin.top - config.margin.bottom;

  d3.csv(config.data, function(data) {

    // Generate dimension and group

    // since its a csv file we need to format the data a bit
    var dateFormat = d3.time.format("%m/%d/%Y");
    data.forEach(function(e) { e.dd = dateFormat.parse(e.date); });

    console.log(data[0], data[data.length-1]);

    // feed it through crossfilter
    var ndx = crossfilter(data);

    // define group all for counting
    var all = ndx.groupAll();

    // define a dimension
    var volumeByMonth = ndx.dimension(function(d) { return d3.time.month(d.dd); });
    // map/reduce to group sum
    var volumeByMonthGroup = volumeByMonth.group().reduceSum(function(d) { return +d.volume; });


    // Line chart

    /* Create a line chart and use the given css selector as anchor. You can also specify
     * an optional chart group for this chart to be scoped within. When a chart belongs
     * to a specific group then any interaction with such chart will only trigger redraw
     * on other charts within the same chart group. */
    dc.lineChart("#monthly-move-chart", "chartGroup")
        .width(990) // (optional) define chart width, :default = 200
        .height(200) // (optional) define chart height, :default = 200
        .transitionDuration(500) // (optional) define chart transition duration, :default = 500
        // (optional) define margins
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(volumeByMonth) // set dimension
        .group(volumeByMonthGroup) // set group
        // (optional) whether chart should rescale y axis to fit data, :default = false
        .elasticY(true)
        // (optional) when elasticY is on whether padding should be applied to y axis domain, :default=0
        .yAxisPadding(100)
        // (optional) whether chart should rescale x axis to fit data, :default = false
        .elasticX(true)
        // (optional) when elasticX is on whether padding should be applied to x axis domain, :default=0
        .xAxisPadding(500)
        // define x scale
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
        // (optional) set filter brush rounding
        .round(d3.time.month.round)
        // define x axis units
        .xUnits(d3.time.months)
        // (optional) render horizontal grid lines, :default=false
        .renderHorizontalGridLines(true)
        // (optional) render vertical grid lines, :default=false
        .renderVerticalGridLines(true)
        // (optional) render as area chart, :default = false
        .renderArea(true)
        // (optional) add stacked group and custom value retriever
        .stack(volumeByMonthGroup, function(d){return d.value;})
        // (optional) you can add multiple stacked group with or without custom value retriever
        // if no custom retriever provided base chart's value retriever will be used
        .stack(volumeByMonthGroup)
        // (optional) whether this chart should generate user interactive brush to allow range
        // selection, :default=true.
        .brushOn(true)
        // (optional) whether dot and title should be generated on the line using
        // the given function, :default=no
        .title(function(d) { return "Value: " + d.value; })
        // (optional) whether chart should render titles, :default = false
        .renderTitle(true)
        // (optional) radius used to generate title dot, :default = 5
        .dotRadius(10);

    window.reloadChart = function() {
    };

    // simply call renderAll() to render all charts on the page
    dc.renderAll();


    // once rendered you can call redrawAll to update charts incrementally when data
    // change without re-rendering everything
    dc.redrawAll();

  });

});
