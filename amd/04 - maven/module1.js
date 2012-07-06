"use strict";

console.log('Loading module1.js');
document.getElementById('console').innerHTML += 'Loading module1.js\n';

define(['./module1/submodule1', './module1/submodule2'], function(){
	
	console.log('Executing module1.js');
	document.getElementById('console').innerHTML += 'Executing module1.js\n';
	
});