"use strict";

console.log('Loading module1.js');
echo('Loading module1.js');

define([], function(){
	
	console.log('Executing module1.js');
	echo('Executing module1.js');
	
	setTimeout(function() {
		
		console.log('Module 1: triggering event "mycustomevent"');
		echo('Module 1: triggering event "mycustomevent"');
		
		
		console.log('Module 1: triggered event "mycustomevent"');
		echo('Module 1: triggered event "mycustomevent"');
		
	}, 5000);
	
	return {
		speak: function(message) {
			console.log('module1.js: ' + message);
			echo('module1.js: ' + message);
			return 'ok';
		}
	};
});