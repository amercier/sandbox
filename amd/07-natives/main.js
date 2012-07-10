"use strict";

if(!('console' in window)) {
	console = {};
}

if(!('log' in console)) {
	var c = document.getElementById('console');
	console.log = function(message) {};
}

function echo(message) {
	document.getElementById('console').appendChild(document.createTextNode(message + "\n\r"));
}

console.log('Loading main.js');
echo('Loading main.js');

define(['es5'], function(module2){
	
	console.log('Executing main.js');
	echo('Executing main.js');
	
	['one', 'two', 'three'].forEach(function(item) {
		console.log('   ✰✰✰ ' + item + ' ✰✰✰');
		echo('   ✰✰✰ ' + item + ' ✰✰✰');
	});
	
	return {};
});