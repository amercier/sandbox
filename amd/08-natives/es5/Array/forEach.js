console.log('Loading es5/Array/forEach');
echo('Loading es5/Array/forEach');

define(['../Function/bind'], function(){
	
	console.log('Executing es5/Array/forEach');
	echo('Executing es5/Array/forEach');

	var prepareString = "a"[0] != "a",
	    toObject = function (o) {
			if (o == null) { // this matches both null and undefined
				throw new TypeError();
			}
			// If the implementation doesn't support by-index access of
			// string characters (ex. IE < 7), split the string
			if (prepareString && typeof o == "string" && o) {
				return o.split("");
			}
			return Object(o);
		},
	    toString = Function.prototype.call.bind(Object.prototype.toString);

	// ES5 15.4.4.18
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function forEach(fun /*, thisp*/) {
			
			var self = toObject(this),
				thisp = arguments[1],
				i = 0,
				length = self.length >>> 0;

			// If no callback function or if callback is not a callable function
			if (toString(fun) != "[object Function]") {
				throw new TypeError();
			}

			while (i < length) {
				if (i in self) {
					// Invoke the callback function with call, passing arguments:
					// context, property value, property key, thisArg object context
					fun.call(thisp, self[i], i, self);
				}
				i++;
			}
		};
	}
	
});