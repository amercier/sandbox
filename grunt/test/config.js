
/*
console.log('');
console.log('');

if(typeof require === "undefined") {
	console.log('typeof require === "undefined"');
}
else {
	console.log('typeof require !== "undefined"');
}
*/

var require = {
	baseUrl : '../src',
	paths: {
		tests: '../test'
		// .../mymodule/            => .../mymodule/index
		// .../mymodule/index.html  => .../mymodule/index
		// .../mymodule/mytest.html => .../mymodule/mytest
	}
};

/*
if(typeof phantom === "undefined") {
	console.log('typeof phantom === "undefined"');
	var require = {
		baseUrl : '../src',
		paths: {
			tests: '../test'
			// .../mymodule/            => .../mymodule/index
			// .../mymodule/index.html  => .../mymodule/index
			// .../mymodule/mytest.html => .../mymodule/mytest
		}
	};
}
else {
	console.log('typeof phantom !== "undefined"');
	require = null;
	importScripts = phantom.injectJs;
	phantom.injectJs('src/js/require/require-jquery.js');
	require = requirejs;
	require.config({
		callback: function() {
			console.log('Exiting PhantomJS');
			phantom.exit();
		},
		baseUrl : '../src',
		paths: {
			domReady: 'src/js/require/domReady',
			tests: '../test'
			// .../mymodule/            => .../mymodule/index
			// .../mymodule/index.html  => .../mymodule/index
			// .../mymodule/mytest.html => .../mymodule/mytest
		}
	});
	require.load = function(context, moduleName, url) {
		if(phantom.injectJs(url)) {
			console.log('Loaded ' + url + ' successfully');
			context.completeLoad(moduleName);
		}
		else {
			throw new Error('RequireJS error: can\'t load ' + url);
		}
	};
	require.onError = function(err) {
		var msg = 'RequireJS error: ' + err.requireType + (err.requireType === 'timeout' ? ' while loading ' + err.requireModules : '');
		console.error(msg);
		throw new Error(msg);
	};
}*/