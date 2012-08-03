"use strict";

console.log('Loading main.js');
echo('Loading main.js');

define(['module2', 'mycustomevent!'], function(module2){
	
	console.log('Executing main.js');
	echo('Executing main.js');
	
	return {};
});