

define(['jquery', 'domReady!'], function($) {
	
	$('#dynamic-run').click(function() {
		
		$('#console').empty();
		
		// Delete if exists
		if($('#dynamic-form').length > 0) {
			echo('Deleting previously added content');
			console.log('Deleting previously added content');
			$('#dynamic-form').remove();
		}
		
		// Create
		$( $('#dynamic-template').text() ).appendTo( $('body') );
	});
	
});