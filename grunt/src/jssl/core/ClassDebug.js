

/*global define */
/*jslint evil: true */
define('jssl/core/ClassDebug', ['./Class'], function(Class) {
	Class.createClass = function createClass(initializing, name) {
		var createdClass = eval('(function ' + name + '() {' + "\n"
				+ '    // All construction is actually done in the init method' + "\n"
				+ '    if (!initializing && this.init)' + "\n"
				+ '        this.init.apply(this, arguments);' + "\n"
				+ '})'
			) || function() { // IE
				// All construction is actually done in the init method
				if(!initializing && this.init) {
					this.init.apply(this, arguments);
				}
			};
		return createdClass;
	};
	return Class;
});