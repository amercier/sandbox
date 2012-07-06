"use strict";

console.log('Loading main.js');
document.getElementById('console').innerHTML += 'Loading main.js\n';

define(['module1', 'module2', 'module3', 'module4'], function(module1, module2, module3, module4){
	
	console.log('Executing main.js');
	document.getElementById('console').innerHTML += 'Executing main.js\n';
	
	return {};
});