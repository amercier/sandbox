"use strict";

console.log('Loading module3.js');
echo('Loading module3.js');

define(['module4'], function(module1){
	
	console.log('Executing module3.js');
	echo('Executing module3.js');
	
	return {};
});