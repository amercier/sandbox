"use strict";

console.log('Loading module1.js');
echo('Loading module1.js');

define(['./module1/submodule1', './module1/submodule2'], function(){
	
	console.log('Executing module1.js');
	echo('Executing module1.js');
	
});