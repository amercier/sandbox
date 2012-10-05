if(!('console' in window)) {
	console = {};
}

if(!('log' in console)) {
	var c = document.getElementById('console');
	console.log = function(message) {};
}

!function() {
	
	require = null;
	importScripts = phantom.injectJs;
	phantom.injectJs('../lib/require-2.1.0.js');
	requirejs.onError = function(err) {
		console.log(err.requireType);
		if (err.requireType === 'timeout') {
			console.log('modules: ' + err.requireModules);
		}
		throw err;
	};
	
	var oldMethods = {};
	["config", "contextName", "registry", "defined", "urlFetched", "defQueue",
	 "Module", "makeModuleMap", "nextTick", "configure", "makeShimExports",
	 "makeRequire", "enable", "completeLoad", "nameToUrl", "load", "execCb",
	 "onScriptLoad", "onScriptError", "require", "startTime"].forEach(function(i) {
		if(requirejs.s.contexts._.hasOwnProperty(i) && typeof requirejs.s.contexts._[i] === 'function' && !(i in oldMethods)) {
			console.log('Overriding ' + i);
			oldMethods[i] = requirejs.s.contexts._[i];
			requirejs.s.contexts._[i] = function() {
				console.log('    => ' + i + '(' + Array.prototype.map.call(arguments,function(p){return typeof p==='function'?'[function]':''+p;}).join(' , ') + ')');
				oldMethods[i].apply(this, arguments);
			};
			requirejs.s.contexts._[i].prototype = oldMethods[i].prototype;
			for(var j in requirejs.s.contexts._[i]) {
				console.log('Overriding ' + i + '.' + j);
				if(oldMethods[i].hasOwnProperty(j)) {
					requirejs.s.contexts._[i][j] = oldMethods[i][j];
				}
			}
		}
	});
	
	
	require([], function(module2){
		console.log('┌───────────────────────────────┐');
		console.log('│ ✔ Running main1 (w/o any dep) │');
		console.log('└───────────────────────────────┘');
	});

	require(['module1'], function(module2){
		console.log('┌──────────────────────────────────────┐');
		console.log('│ ✔ Running main2 (1 dep w/o domready) │');
		console.log('└──────────────────────────────────────┘');
	});

	/*
	require(['module2'], function(module2){
		console.log('┌──────────────────────────────────────┐');
		console.log('│ ✔ Running main2 (2 deps w/o domready) │');
		console.log('└──────────────────────────────────────┘');
	});

	require(['module2', 'domReady!'], function(module2){
		console.log('┌─────────────────────────────────┐');
		console.log('│ ✔ Running main3 (with domready) │');
		console.log('└─────────────────────────────────┘');
	});
	*/
}();