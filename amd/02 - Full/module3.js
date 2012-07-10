"use strict";

console.log('Loading module3.js');
document.getElementById('console').innerHTML += 'Loading module3.js\n';

define(['module4'], function(module1){
	
	console.log('Executing module3.js');
	document.getElementById('console').innerHTML += 'Executing module3.js\n';
	
	return {};
});