
require.config({
	baseUrl: '../lib',
	shim: {
		'jquery.ui.dialog'   : ['jquery', 'jquery.ui.core', 'jquery.ui.position', 'jquery.ui.widget'],
		'jquery.ui.draggable': ['jquery.ui.mouse'],
		'jquery.ui.resizable': ['jquery.ui.mouse'],
		'jquery.ui.mouse'    : ['jquery', 'jquery.ui.core', 'jquery.ui.widget']
	}
});

require(['jquery', 'echo', 'jquery.ui.draggable', 'jquery.ui.dialog'], function($, echo) {
	
	var options = {
		autoOpen: false,
		buttons: [
			{
				'class': 'form-control ok',
				html: 'OK',
				click: function(event) {
					event.preventDefault();
					if(this.checkValidity()) {
						$(this).trigger('submit').dialog('close');
					}
				}
			},
			{
				'class': 'form-control cancel',
				html: 'Cancel',
				click: function() { $(this).dialog("close"); }
			}
		],
		position: 'center',
		width: 680,
		show: { effect:'fade', duration: 300},
		hide: { effect:'fade', duration: 200}
	};
	
	var dialog, container;
	$('#dialog-delete-parent-issue').click(function() {
		
		if((dialog = $('#dialog-form')).length === 0) {
			
			console.log('Create container...');
			echo('Create container...');
			container = $('<div id="dialog-container"></div>').appendTo( $('body') );
			
			console.log('Inserting template...');
			echo('Inserting template...');
			dialog = $( $('#dialog-template').text() ).appendTo(container);
			
			console.log('Initializing dialog...');
			echo('Initializing dialog...');
			$( $('#dialog-form') ).dialog(options);
		}
		else {
			console.log('Template has been loaded already...');
			echo('Template has been loaded already...');
		}
		
		console.log('Opening dialog...');
		echo('Opening dialog...');
		dialog.dialog('open');
		
		/*
		setTimeout(function() {
			console.log('Closing dialog...');
			echo('Closing dialog...');
			dialog.dialog('close');
		}, 1000);
		*/
		
		container.bind('remove', function() {
			console.log('Closing dialog a second time...');
			echo('Closing dialog a second time...');
			dialog.dialog('close');
		});
		
		setTimeout(function() {
			if(container.length > 0) {
				console.log('Removing container...');
				echo('Removing container...');
				container.remove();
			} else {
				console.log('Container already removed');
				echo('Container already removed');
			}
		}, 3000);
		
		setTimeout(function() {
			console.log('Re-opening dialog...');
			echo('Re-opening dialog...');
			dialog.dialog('open');
		}, 3500);
	});
	
});