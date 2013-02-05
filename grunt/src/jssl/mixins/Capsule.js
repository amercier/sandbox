
/*global define */
define('jssl/mixins/Capsule', ['../core/Initializer'], function(Initializer) {
	
	function capitalize(name) {
		return name.replace(/^[a-z]/, function(letter) { return letter.toUpperCase(); });
	}
	
	function makeMethodName(options, fieldName, methodNamePrefix, methodNameSuffix) {
		return options && options.methodNames && options.methodNames.hasOwnProperty(methodNamePrefix)
			? options.methodNames[methodNamePrefix]
			: (methodNamePrefix + capitalize(fieldName) + (methodNameSuffix || ''));
	}
	
	function validate(options, value) {
		var validators = (options && options.hasOwnProperty('validators') && options.validators) || [],
		    result,
		    i;
		for(i = 0 ; i < validators.length ; i++) {
			if((result = validators[i](value)) !== true) {
				return result;
			}
		}
		return true;
	}
	
	function InvalidDefaultValueError(message) {
		this.name = "InvalidDefaultValueError";
		this.message = (message || "");
	}
	InvalidDefaultValueError.prototype = Error.prototype;
	
	function InvalidValueError(message) {
		this.name = "InvalidValueError";
		this.message = (message || "");
	}
	InvalidValueError.prototype = Error.prototype;
	
	function Capsule(fieldName, options) {
		
		var methods = {},
		    defaultValue = options && options.hasOwnProperty('defaultValue') ? options.defaultValue : undefined,
		    methodNames = {
			'init': makeMethodName(options, fieldName, 'init'),
			'get' : makeMethodName(options, fieldName, 'get'),
			'set' : makeMethodName(options, fieldName, 'set')
		};
		
		// Checks the default value
		if(!validate(options, defaultValue)) {
			throw new InvalidDefaultValueError('Trying to create a new Capsule "' + fieldName + '" with an invalid default value "' + defaultValue + '" (' + typeof defaultValue + ')');
		}
		
		// initXXX
		methods[methodNames.init] = function() {
			
			if(!this.hasOwnProperty(fieldName)) { // prevents overriding already set field
				this[fieldName] = defaultValue;
			}
			
			return this;
		};
		
		// getXXX
		methods[methodNames.get] = function() {
			return this[fieldName];
		};
		
		// setXXX
		methods[methodNames.set] = function(value) {
			if(!validate(options, value)) {
				throw new InvalidValueError(this + '.' + methodNames.set + '(): trying to set an invalid value "' + value + '" (' + typeof value + ')');
			}
			this[fieldName] = value;
			return this;
		};
		
		// Returns the setter, wrapped into a Class extending Initializer
		return Initializer.extend('Capsule', {
			fieldName: fieldName
		}, methods);
	}
	
	Capsule.InvalidDefaultValueError = InvalidDefaultValueError;
	Capsule.InvalidValueError = InvalidValueError;
	Capsule.capitalize = capitalize;
	Capsule.makeMethodName = makeMethodName;
	Capsule.validate = validate;
	return Capsule;
});