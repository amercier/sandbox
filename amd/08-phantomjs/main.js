if(!('console' in window)) {
	console = {};
}

if(!('log' in console)) {
	var c = document.getElementById('console');
	console.log = function(message) {};
}

//Overrides the setTimeoutMethod
!function() {
	var originalSetTimeout = setTimeout;
	setTimeout = function(fn, delay) {
		var timeoutId = originalSetTimeout(function(){},0);
		fn && typeof fn === 'function' && fn();
		return timeoutId;
	};
}();

require = null;
importScripts = phantom.injectJs;
phantom.injectJs('../lib/require-2.1.0.js');

/*
var oldContextCreator = requirejs.s.newContext;
requirejs.s.newContext = function(name) {
	var context = oldContextCreator(name);
	console.log('Creating context', name, context);
	return context;
};
*/


var oldMethods = {};
['require','load','toUrl','exec','nextTick','execCb','completeLoad'].forEach(function(i) {
	if(requirejs.s.contexts._.hasOwnProperty(i) && typeof requirejs.s.contexts._[i] === 'function' && !(i in oldMethods)) {
		console.log('Overriding ' + i);
		oldMethods[i] = requirejs.s.contexts._[i];
		requirejs.s.contexts._[i] = function() {
			console.log('    => ' + i + '(' + /*Array.prototype.join.call(arguments,' , ')*/arguments.length + ')');
			for(var j in this) {
				if((j in this) && typeof this[j] !== 'function') {
					console.log('                ' + j + ' => ' + this[j]);
				}
			}
			for(var j in this.defined) {
				if((j in this.defined) && typeof this.defined[j] !== 'function') {
					console.log('                ' + j + ' >> ' + this.defined[j]);
				}
			}
			for(var j in this.urlFetched) {
				if((j in this.urlFetched) && typeof this.urlFetched[j] !== 'function') {
					console.log('                ' + j + ' :> ' + this.urlFetched[j]);
				}
			}
			
			oldMethods[i].apply(this.arguments);
		};
	}
});

require = requirejs;

/*
require.s.contexts._.nextTick = function(fn) {
	console.log('nextTick', fn);
	fn();
};
*/

/*
require = function() {
	//console.log('REQUIRE (' + Array.prototype.join.call(arguments,' , ') + ')');
	requirejs.apply(this, arguments);
};
*/

requirejs.config({
	paths: {
		'domReady': '../../lib/domReady'
	},
	callback: phantom.exit
});

requirejs.onError = function(err, isOriginalError) {
	if(!isOriginalError) {
		console.log('##################### ' + err.message + (err.requireModules ? ' in ' + err.requireModules : '') + ' #####################');
	}
	for(var i in err) {
		if((i in err) && typeof err[i] !== 'function') {
			console.log('    ' + i + ' => ' + err[i]);
		}
	}
};

console.log('Including RequireJs');
console.log('Loading main.js');

require([], function(module2){
	console.log('┌───────────────────────────────┐');
	console.log('│ ✔ Running main1 (w/o any dep) │');
	console.log('└───────────────────────────────┘');
});

require(['module2'], function(module2){
	console.log('┌─────────────────────────────────┐');
	console.log('│ ✔ Running main2 (w/o domready) │');
	console.log('└─────────────────────────────────┘');
});

require(['module2', 'domReady!'], function(module2){
	console.log('┌─────────────────────────────────┐');
	console.log('│ ✔ Running main3 (with domready) │');
	console.log('└─────────────────────────────────┘');
});

console.log(requirejs.s.contexts._.defQueue.length + ' modules to load');
console.log('Loaded modules:');
for(var i in requirejs.s.contexts._.defined) {
	if(requirejs.s.contexts._.defined.hasOwnProperty(i)) {
		console.log('  - ' + i + ': ' + (typeof requirejs.s.contexts._.defined[i]));
	}
}
console.log('Queue:');
for(var i in requirejs.s.contexts._.defQueue) {
	if(requirejs.s.contexts._.defQueue.hasOwnProperty(i)) {
		console.log('  - ' + i + ': ' + (typeof requirejs.s.contexts._.defQueue[i]));
	}
}

setTimeout(function() {
	phantom.exit();
}, 5000);
