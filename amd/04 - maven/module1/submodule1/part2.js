"use strict";

console.log('Loading module1/submodule1/part2.js');
document.getElementById('console').innerHTML += 'Loading  module1/submodule1/part2.js\n';

define(function(module1){
	
	console.log('Executing  module1/submodule1/part2.js');
	document.getElementById('console').innerHTML += 'Executing  module1/submodule1/part2.js\n';
	
	return {};
});