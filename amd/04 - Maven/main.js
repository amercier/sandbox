"use strict";

console.log('Loading main.js');
echo('Loading main.js');

define(['module1', 'module2', 'module3', 'module4', 'domReady!'], function(module1, module2, module3, module4){
	
	console.log('Executing main.js');
	echo('Executing main.js');
	
	return {};
});