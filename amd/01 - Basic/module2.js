"use strict";

console.log('Loading module2.js');
document.getElementById('console').innerHTML += 'Loading module2.js\n';

define(['module1'], function(module1){
	
	console.log('Executing module2.js');
	document.getElementById('console').innerHTML += 'Executing module2.js\n';
	
	console.log('Trying to use module1...');
	document.getElementById('console').innerHTML += 'Trying to use module1...\n';
	
	if(module1.speak('Hello, World!') === 'ok') {
		console.log('module1 used successfully');
		document.getElementById('console').innerHTML += 'module1 used successfully\n';
	}
	else {
		console.error('Failed using module1');
		document.getElementById('console').innerHTML += 'Failed using module1\n';
	}
	
	return {};
});