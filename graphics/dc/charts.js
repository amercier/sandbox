window.config = {
    data: data,
    code: code,
    container : $('.chart-container').get(0),
    margin: {
      top: 20,
      right: 0,
      bottom: 30,
      left: 30
    },
    width: 700,
    height: 200,
    options: {}
  };
$.ajax(config.data         , { dataType: 'text' }).done( function(text){ $('.chart-data'    ).text(text); } ).fail( function(){ $('.chart-data'    ).text('Error: can\'t load ' + data); } );
$.ajax(config.code + '.js' , { dataType: 'text' }).done( function(code){ $('.chart-code-js' ).text(code); } ).fail( function(){ $('.chart-code-js' ).text('Error: can\'t load ' + code + '.js'); } );
$.ajax(config.code + '.css', { dataType: 'text' }).done( function(code){ $('.chart-code-css').text(code); } ).fail( function(){ $('.chart-code-css').text('Error: can\'t load ' + code + '.css'); } );

function getValue($field) {
    switch( $field.attr('type') ) {
      case 'radio'   :
      case 'checkbox': return $field.prop('checked');
      default        : return $field.val();
    }
}

$('[data-for]').each(function(i, span) {
  var $span = $(span);
  $( '#' + $span.data('for') ).change(function (e) {
    $span.text( getValue($(e.target)) );
  });
});

var initializing = true;
$('.chart-option').change(function(e) {
    var $target = $(e.target);
    window.config.options[$target.data('option')] = getValue($target);
    if(!initializing) {
      $(config.container).empty();
      reloadChart();
    }
  })
  .trigger('change');
initializing = false;
