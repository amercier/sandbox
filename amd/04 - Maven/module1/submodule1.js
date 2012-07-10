"use strict";

console.log('Loading module1/submodule1.js');
document.getElementById('console').innerHTML += 'Loading  module1/submodule1.js\n';

define(['./submodule1/part1', './submodule1/part2'], function(module1){
	
	console.log('Executing  module1/submodule1.js');
	document.getElementById('console').innerHTML += 'Executing  module1/submodule1.js\n';
	
	return {};
});