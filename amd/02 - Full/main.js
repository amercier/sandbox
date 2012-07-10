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

define(['module1', 'module2', 'module3', 'module4', 'domReady!'], function(module1, module2, module3, module4){
	
	console.log('Executing main.js');
	echo('Executing main.js');
	
	return {};
});