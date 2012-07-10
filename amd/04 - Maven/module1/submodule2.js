"use strict";

console.log('Loading module1/submodule2.js');
echo('Loading  module1/submodule2.js');

define(['../module4'], function(module1){
	
	console.log('Executing  module1/submodule2.js');
	echo('Executing  module1/submodule2.js');
	
	return {};
});