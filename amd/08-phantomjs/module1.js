"use strict";

console.log('Loading module1.js');

define([], function(){
	
	console.log('Executing module1.js');
	
	return {
		speak: function(message) {
			console.log('module1.js: ' + message);
			return 'ok';
		}
	};
});
