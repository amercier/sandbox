"use strict";

console.log('Loading main.js');
document.getElementById('console').innerHTML += 'Loading main.js\n';

define(['module2'], function(module2){
	
	console.log('Executing main.js');
	document.getElementById('console').innerHTML += 'Executing main.js\n';
	
	return {};
});