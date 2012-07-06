"use strict";

console.log('Loading module1.js');
document.getElementById('console').innerHTML += 'Loading module1.js\n';

define([], function(){
	
	console.log('Executing module1.js');
	document.getElementById('console').innerHTML += 'Executing module1.js\n';
	
	return {
		speak: function(message) {
			console.log('module1.js: ' + message);
			document.getElementById('console').innerHTML += 'module1.js: ' + message + '\n';
			return 'ok';
		}
	};
});