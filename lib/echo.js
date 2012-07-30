define(function() {

	if(!('console' in window)) {
		console = {};
	}
	
	if(!('log' in console)) {
		console.log = function(message) {};
	}
	
	var c = document.getElementById('console');
	return function echo(message) {
		c.appendChild(document.createTextNode(message + "\n\r"));
	};
});