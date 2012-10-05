if(!('console' in window)) {
	console = {};
}

if(!('log' in console)) {
	var c = document.getElementById('console');
	console.log = function(message) {};
}

require = null;
importScripts = phantom.injectJs;
phantom.injectJs('require-2.1.0-phantom.js');
require.config({
	paths: {
		'domReady': '../../lib/domReady'
	}
});

console.log('Including RequireJs');
console.log('Loading main.js');

require(['module2', 'domReady!'], function(module2){
	console.log('Executing main.js');
	phantom.exit();
});
