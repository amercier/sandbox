var barchart = d3.select('.chart-bar')
  .append('svg')
  .attr('height', 200)
  .attr('width', 700)
  .chart('BarChart');

barchart.draw([
  { name : 'January', value : 29 },
  { name : 'February', value : 32 },
  { name : 'March', value : 48 },
  { name : 'April', value : 49 },
  { name : 'May', value : 58 },
  { name : 'June', value : 68 },
  { name : 'July', value : 74 },
  { name : 'August', value : 73 },
  { name : 'September', value : 65 },
  { name : 'October', value : 54 },
  { name : 'November', value : 45 },
  { name : 'December', value : 35 }
]);
