"use strict";

console.log('Loading module2.js');
echo('Loading module2.js');

define(['module1'], function(module1){
	
	console.log('Executing module2.js');
	echo('Executing module2.js');
	
	console.log('Trying to use module1...');
	echo('Trying to use module1...');
	
	if(module1.speak('Hello, World!') === 'ok') {
		console.log('module1 used successfully');
		echo('module1 used successfully');
	}
	else {
		console.error('Failed using module1');
		echo('Failed using module1');
	}
	
	return {};
});