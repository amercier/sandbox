if(!('console' in window)) {
	console = {};
}

if(!('log' in console)) {
	var c = document.getElementById('console');
	console.log = function(message) {};
}

!function() {
	
	require = {
		callback: function() {
			phantom.exit();
		},
		paths: {
			domReady: '../lib/domReady'
		}
	};
	importScripts = phantom.injectJs;
	phantom.injectJs('../lib/require-2.1.0.js');
	require.load = function(context, moduleName, url) {
		if(phantom.injectJs(url)) {
			context.completeLoad(moduleName);
		}
		else {
			throw new Error('Can\'t load ' + url);
		}
	};
	require.onError = function(err) {
		console.log(err.requireType);
		if (err.requireType === 'timeout') {
			console.log('modules: ' + err.requireModules);
		}
		throw err;
	};
	
	require([], function(module2){
		console.log('┌───────────────────────────────┐');
		console.log('│ ✔ Running main1 (w/o any dep) │');
		console.log('└───────────────────────────────┘');
	});

	require(['module1'], function(module1){
		console.log('┌──────────────────────────────────────┐');
		console.log('│ ✔ Running main2 (1 dep w/o domready) │');
		console.log('└──────────────────────────────────────┘');
	});

	require(['module2'], function(module2){
		console.log('┌───────────────────────────────────────┐');
		console.log('│ ✔ Running main2 (2 deps w/o domready) │');
		console.log('└───────────────────────────────────────┘');
	});

	require(['module2', 'domReady!'], function(module2){
		console.log('┌─────────────────────────────────┐');
		console.log('│ ✔ Running main3 (with domready) │');
		console.log('└─────────────────────────────────┘');
	});
}();