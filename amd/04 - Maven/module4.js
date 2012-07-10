"use strict";

console.log('Loading module4.js');
echo('Loading module4.js');

define(function(module1){
	
	console.log('Executing module4.js');
	echo('Executing module4.js');
	
	return {
		speak: function(message) {
			console.log('module4.js: ' + message);
			echo('module4.js: ' + message);
			return 'ok';
		}
	};
});