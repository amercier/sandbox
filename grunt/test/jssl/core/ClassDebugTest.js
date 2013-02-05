/**
 * Unit tests for jssl/core/Class
 */

define(['jssl/core/ClassDebug'/*, 'tests/jssl/core/ClassTest'*/], function(Class) {
	
	module('jssl/core/ClassDebug');

	var Person = Class.extend('Person', {
		init : function(isDancing) {
			this.dancing = isDancing;
		},
		dance : function() {
			return this.dancing;
		}
	});
	
	var Ninja = Person.extend('Ninja', {
		init : function() {
			this._super(false);
		},
		dance : function() {
			// Call the inherited version of dance()
			return this._super();
		},
		swingSword : function() {
			return true;
		}
	});
	
	var FireNinja = Ninja.extend('FireNinja', {
		init : function() {
			return this._super();
		},
		dance : function() {
			return this._super();
		},
		throwFireBall : function() {
			if('console' in window)
				console.log(this, ': fire!');
		}
	});
	
	test('Class name', function() {
		var AnonymousPerson = Class.extend({});
		var AnonymousNinja = AnonymousPerson.extend({});
		var AnonymousFireNinja = AnonymousNinja.extend({});
		strictEqual(AnonymousPerson.name   , 'AnonymousClass', 'AnonymousPerson.name should equal "AnonymousClass"');
		strictEqual(AnonymousNinja.name    , 'AnonymousClass', 'AnonymousNinja.name should equal "AnonymousClass"');
		strictEqual(AnonymousFireNinja.name, 'AnonymousClass', 'AnonymousFireNinja.name should equal "AnonymousClass"');
		
		strictEqual(Person.name   , 'Person'   , 'Person.name should equal "Person"');
		strictEqual(Ninja.name    , 'Ninja'    , 'Ninja.name should equal "Ninja"');
		strictEqual(FireNinja.name, 'FireNinja', 'FireNinja.name should equal "FireNinja"');

		if(Object.getOwnPropertyDescriptor) {
			strictEqual(Object.getOwnPropertyDescriptor(Person   ,'name').value, 'Person'   , 'Person.name should equal "Person"');
			strictEqual(Object.getOwnPropertyDescriptor(Ninja    ,'name').value, 'Ninja'    , 'Ninja.name should equal "Ninja"');
			strictEqual(Object.getOwnPropertyDescriptor(FireNinja,'name').value, 'FireNinja', 'FireNinja.name should equal "FireNinja"');
		}
	});
		
	test('Static inheritance', function() {
		ok(!('parent' in Class), 'Class should not have a "parent" field');
		strictEqual(Person.parent.name   , 'Class'    , 'Person.parent should exist and be Class');
		strictEqual(Ninja.parent.name    , 'Person'   , 'Ninja.parent should exist and be Person');
		strictEqual(FireNinja.parent.name, 'Ninja'    , 'FireNinja.parent should exist and be Ninja');
	});
});