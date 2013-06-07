/*!d3.charts.js*/
/**
 * Charts using D3.js
 *
 * Inheritance
 * ===========
 *
 * Prototypal inheritance is provided through native Javascript class
 * inheritance pattern:
 *
 *     function Parent(param1, ...) {
 *        ...
 *     }
 *
 *     function __();
 *     function Child(param1, ...) {
 *        Parent.call(this, param1, ...);
 *        ...
 *     }
 *     Child.prototype = new __();
 *     Child.prototype.constructor = Child;
 *
 * This can changed by overriding Charts.inherit(parentClass, childClass).
 */
(function (root) {


function __() {}; // see inherhit()

/**
 * Inheritance method
 *
 */
var inherit = root && root.inherit || function inherhit(parentClass, childClass) {
  __.prototype = parentClass.prototype;
  childClass.prototype = new __();
  childClass.prototype.constructor = childClass;
};

/**
 * Options checking
 * Raises an error if check doesn't pass
 */
function check(name, value, type) {
  switch (type) {

    case 'object':
    case 'array':
      var stringOfValue = Object.prototype.toString.call(value).toLowerCase();
      if(value !== undefined && stringOfValue !== '[object ' + type + ']') {
        throw new Error('Expecting ' + name + ' to be an ' + type + ', "' + (stringOfValue) + '" given');
      }
      break;

    case 'string':
    case 'function':
      var typeofValue = typeof value;
      if(value !== undefined && typeOfValue !== type) {
        throw new Error('Expecting ' + name + ' to be a ' + type + ', "' + (typeOfValue) + '" given');
      }
      break;

    default: // type not specified
      if(value === undefined) {
        throw new Error('Missing "' + type + '"');
      }
  }
}

function Canvas (options) {

}

function Layer (type, content) {
  check('type', type);
  check('type', type, 'string');
  check('content', content);
  check('content', content, 'object');
  this.type = type;
  this.content = content;
}

Layer.prototype.getType = function getType () {
  return this.type;
};

Layer.prototype.getContent = function getContent () {
  return this.content;
};

Layer.prototype.render = function render (container) {



};

function AxisLayer = function (options) {
}

AxisLayer.prototype.getAxis = function (options) {
  if (!this.axis) {
    this.axis = d3.time.scale().range([0, this.getWidth()]);
  }
  return this.axis;
}

function TimeAxisLayer = function (options) {
};

TimeAxisLayer.prototype.getScale () {
  if (!this.scale) {
    this.scale = d3.time.scale().range([0, this.getWidth()]);
  }
  return this.scale;
}

XAxisLabelLayer.prototype.render = function render (container) {

  var g = container.append('g')
    .attr('class', this.options.class || '')
    .attr('transform', 'translate(' + this.x + ',' + this.y + ')')
    .call(this.axis);

  if(this.options.labelRotation) {
    g.selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', function(d) {
          return 'rotate(' + this.options.rotateLabels + ' )';
        });
  }

  return this;
};

XAxisTickLayer.prototype.render = function render (container) {

  var g = container.append('g')
    .attr('class', this.options.class || '')
    .attr('transform', 'translate(' + this.x + ',' + this.y + ')')
    .call(this.axis);

  if(this.options.labelRotation) {
    g.selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', function(d) {
          return 'rotate(' + this.options.rotateLabels + ' )';
        });
  }

  return this;
};

/* ========================================================================== */

function Chart (options) {
  check('options', options);

  this.options = options || {};
  this.layers = [];
  this.canvas = new Canvas();
}

/**
 * Render the chart
 * @param {HTMLElement} container
 */
Chart.prototype.render = function render (container) {

  var svg = d3.select(container).append('svg');

  this.layers.forEach( function (layer) {
    layer.render(svg);
  });

};

Chart.prototype.renderXAxis = function (layer) {



};

Chart.prototype.addXAxis = function addXAxis (options) {

  var axisLayer = new CompositeLayer(options);



  this.addLayer(

      .addChild( new )
  );
};

/* ========================================================================== */

function TimeChart(options) {
  Chart.call(this, options);
  check('getTime(d)', options);
  check('getTime(d)', options, 'function');
}
inherit(Chart, TimeChart);

/* ========================================================================== */

function ContinuousTimeChart(options) {
  TimeChart.call(this, options);
}
inherit(TimeChart, ContinuousTimeChart);

/* ========================================================================== */

function DicreteTimeChart(options) {
  DiscreteTimeChart.call(this, options);
}
inherit(TimeChart, DiscreteTimeChart);

/* ========================================================================== */

root.Chart = Chart;
root.TimeChart = TimeChart;
root.ContinuousTimeChart = ContinuousTimeChart;
root.DicreteTimeChart = DicreteTimeChart;

})(window.Charts || (window.Charts = {}));
