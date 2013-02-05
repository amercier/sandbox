
/*global define */
define('jssl/core/Initializer', ['./Class'], function(Class) {
	return Class.extend('Initializer', {
		
		/**
		 * Initializer constructor. Run all this.init*() methods without any
		 * parameter.
		 * 
		 * @constructor
		 */
		init: function() {
			var pattern = /^init[A-Z]/,
			    i;
			for(i in this) {
				if(pattern.test(i) && typeof this[i] === 'function') {
					this[i]();
				}
			}
		}
	});
});