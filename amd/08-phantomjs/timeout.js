
var i = 1;
var show = function() {
	console.log('show', i++);
	setTimeout(show, 200);
};
setTimeout(show, 100);

setTimeout(function() {
	console.log('after exit');
}, 1200);

setTimeout(function() {
	phantom.exit();
}, 1000);