"use strict";

console.log('Loading module1/submodule1.js');
echo('Loading  module1/submodule1.js');

define(['./submodule1/part1', './submodule1/part2'], function(module1){
	
	console.log('Executing  module1/submodule1.js');
	echo('Executing  module1/submodule1.js');
	
	return {};
});