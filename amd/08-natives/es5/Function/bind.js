
console.log('Loading es5/Array/bind');
echo('Loading es5/Array/bind');
	

define([], function(){
	
	console.log('Executing es5/Array/bind');
	echo('Executing es5/Array/bind');
	
	var slice = Array.prototype.slice;
	
	// ES-5 15.3.4.5
	// http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf
	if (!Function.prototype.bind) {
		
		echo('declaring bind');
		
		Function.prototype.bind = function bind(that) { // .length is 1
			
			echo('binding...');
			
			// 1. Let Target be the this value.
			var target = this;
			// 2. If IsCallable(Target) is false, throw a TypeError exception.
			if (typeof target != "function")
				throw new TypeError(); // TODO message
			// 3. Let A be a new (possibly empty) internal list of all of the
			//   argument values provided after thisArg (arg1, arg2 etc), in order.
			// XXX slicedArgs will stand in for "A" if used
			var args = slice.call(arguments, 1); // for normal call
			// 4. Let F be a new native ECMAScript object.
			// 9. Set the [[Prototype]] internal property of F to the standard
			//   built-in Function prototype object as specified in 15.3.3.1.
			// 10. Set the [[Call]] internal property of F as described in
			//   15.3.4.5.1.
			// 11. Set the [[Construct]] internal property of F as described in
			//   15.3.4.5.2.
			// 12. Set the [[HasInstance]] internal property of F as described in
			//   15.3.4.5.3.
			// 13. The [[Scope]] internal property of F is unused and need not
			//   exist.
			var bound = function () {
	
				if (this instanceof bound) {
					// 15.3.4.5.2 [[Construct]]
					// When the [[Construct]] internal method of a function object,
					// F that was created using the bind function is called with a
					// list of arguments ExtraArgs the following steps are taken:
					// 1. Let target be the value of F's [[TargetFunction]]
					//   internal property.
					// 2. If target has no [[Construct]] internal method, a
					//   TypeError exception is thrown.
					// 3. Let boundArgs be the value of F's [[BoundArgs]] internal
					//   property.
					// 4. Let args be a new list containing the same values as the
					//   list boundArgs in the same order followed by the same
					//   values as the list ExtraArgs in the same order.
	
					var F = function(){};
					F.prototype = target.prototype;
					var self = new F;
	
					var result = target.apply(
						self,
						args.concat(slice.call(arguments))
					);
					if (result !== null && Object(result) === result)
						return result;
					return self;
	
				} else {
					// 15.3.4.5.1 [[Call]]
					// When the [[Call]] internal method of a function object, F,
					// which was created using the bind function is called with a
					// this value and a list of arguments ExtraArgs the following
					// steps are taken:
					// 1. Let boundArgs be the value of F's [[BoundArgs]] internal
					//   property.
					// 2. Let boundThis be the value of F's [[BoundThis]] internal
					//   property.
					// 3. Let target be the value of F's [[TargetFunction]] internal
					//   property.
					// 4. Let args be a new list containing the same values as the list
					//   boundArgs in the same order followed by the same values as
					//   the list ExtraArgs in the same order. 5.  Return the
					//   result of calling the [[Call]] internal method of target
					//   providing boundThis as the this value and providing args
					//   as the arguments.
	
					// equiv: target.call(this, ...boundArgs, ...args)
					return target.apply(
						that,
						args.concat(slice.call(arguments))
					);
	
				}
	
			};
			// XXX bound.length is never writable, so don't even try
			//
			// 16. The length own property of F is given attributes as specified in
			//   15.3.5.1.
			// TODO
			// 17. Set the [[Extensible]] internal property of F to true.
			// TODO
			// 18. Call the [[DefineOwnProperty]] internal method of F with
			//   arguments "caller", PropertyDescriptor {[[Value]]: null,
			//   [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]:
			//   false}, and false.
			// TODO
			// 19. Call the [[DefineOwnProperty]] internal method of F with
			//   arguments "arguments", PropertyDescriptor {[[Value]]: null,
			//   [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]:
			//   false}, and false.
			// TODO
			// NOTE Function objects created using Function.prototype.bind do not
			// have a prototype property.
			// XXX can't delete it in pure-js.
			
			echo('Done binding');
			
			return bound;
		};
	}

});