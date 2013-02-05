/**
 * Unit tests for jssl/core/Class
 */

define(['jssl/core/Class'], function(Class) {
	
	module('jssl/core/Class');

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
	
	test('Class definition', function() {
		var p = new Person(true);
		strictEqual(p.dancing, true, 'new Person(true).dancing should equal true');
		strictEqual(p.dance(), true, 'new Person(true).dance() should return true');
	});
	
	test('Functional inheritance', function() {
		var n = new Ninja();
		strictEqual(n.dancing     , false, 'new Ninja().dancing should equal false');
		strictEqual(n.dance()     , false, 'new Ninja().dance() should return false');
		strictEqual(n.swingSword(), true , 'new Ninja().swingSword() should return false');
		ok(!('_super' in n), 'new Ninja() object shouldn\'t be altered with property _super');
		
		var fn = new FireNinja();
		strictEqual(fn.dancing     , false, 'new FireNinja().dancing should equal false');
		strictEqual(fn.dance()     , false, 'new FireNinja().dance() should return false');
		strictEqual(fn.swingSword(), true , 'new FireNinja().swingSword() should return false');
		ok(!('_super' in fn), 'new FireNinja() object shouldn\'t be altered with property _super');
	});
	
	test('Inheritance checking', function() {
		var p = new Person(true);
		var n = new Ninja();
		strictEqual(p instanceof Person, true, 'new Person() should be an instance of Person');
		strictEqual(p instanceof Class , true, 'new Person() should be an instance of Class');
		strictEqual(n instanceof Ninja , true, 'new Ninja() should be an instance of Ninja');
		strictEqual(n instanceof Person, true, 'new Ninja() should be an instance of Person');
		strictEqual(n instanceof Class , true, 'new Ninja() should be an instance of Class');
	});
	
	test('Name checking', function() {
		
		strictEqual(typeof Class.InvalidNameError, 'function', 'Class.InvalidNameError should exist and be a function');
		var e = new Class.InvalidNameError('test');
		ok(e instanceof Class.InvalidNameError, 'Class.InvalidNameError is a valid constructor');
		ok(e instanceof SyntaxError           , 'Class.InvalidNameError inherits SyntaxError');
		
		// Raises an InvalidClassNameError
		raises(function() { Class.extend('0MyClass', {}); }, function(e) { return e instanceof Class.InvalidNameError; }, 'Class name starting with a digit should be forbidden');
		raises(function() { Class.extend('_MyClass', {}); }, function(e) { return e instanceof Class.InvalidNameError; }, 'Class name starting with an _ should be forbidden');
		raises(function() { Class.extend('MyClass_', {}); }, function(e) { return e instanceof Class.InvalidNameError; }, 'Class name ending with an _ should be forbidden');
		raises(function() { Class.extend('myClass' , {}); }, function(e) { return e instanceof Class.InvalidNameError; }, 'Class name starting with a lower case character should be forbidden');
		raises(function() { Class.extend('My-Class', {}); }, function(e) { return e instanceof Class.InvalidNameError; }, 'Class name containing a - should be forbidden');
		
		// Doesn't raise a InvalidClassNameError
		function OKError(){}; OKError.prototype = new Error();
		raises(function() { Class.extend('My_Class', {}); throw new OKError('ok'); }, function(e) { return e instanceof OKError; }, 'Class name containing a _ should be allowed');
		raises(function() { Class.extend('MyClass0', {}); throw new OKError('ok'); }, function(e) { return e instanceof OKError; }, 'Class name containing a digit should be allowed');
		raises(function() { Class.extend('MYCLASS' , {}); throw new OKError('ok'); }, function(e) { return e instanceof OKError; }, 'Class name containing upper case characters only should be allowed');
	});
	
	test('Optional name', function() {
		
		var Person = Class.extend({
			init : function(isDancing) {
				this.dancing = isDancing;
			},
			dance : function() {
				return this.dancing;
			}
		});
		
		var p = new Person(true);
		strictEqual(p.dancing, true, 'new Person(true).dancing should equal true');
		strictEqual(p.dance(), true, 'new Person(true).dance() should return true');
	});
	
	test('Class name', function() {
		
		if(Object.getOwnPropertyDescriptor) {
			strictEqual(Object.getOwnPropertyDescriptor(Person   ,'name').enumerable, false, 'Person.name should not be enumerable');
			strictEqual(Object.getOwnPropertyDescriptor(Ninja    ,'name').enumerable, false, 'Ninja.name should not be enumerable');
			strictEqual(Object.getOwnPropertyDescriptor(FireNinja,'name').enumerable, false, 'FireNinja.name should not be enumerable');

			strictEqual(Object.getOwnPropertyDescriptor(Person   ,'name').writable, false, 'Person.name should not be writable');
			strictEqual(Object.getOwnPropertyDescriptor(Ninja    ,'name').writable, false, 'Ninja.name should not be writable');
			strictEqual(Object.getOwnPropertyDescriptor(FireNinja,'name').writable, false, 'FireNinja.name should not be writable');

			strictEqual(Object.getOwnPropertyDescriptor(Person   ,'name').configurable, false, 'Person.name should not be configurable');
			strictEqual(Object.getOwnPropertyDescriptor(Ninja    ,'name').configurable, false, 'Ninja.name should not be configurable');
			strictEqual(Object.getOwnPropertyDescriptor(FireNinja,'name').configurable, false, 'FireNinja.name should not be configurable');
		}
	});
	
	test('Static inheritance', function() {
		ok(!('parent' in Class), 'Class should not have a "parent" field');
		strictEqual(Person.parent   , Class    , 'Person.parent should exist and be Class');
		strictEqual(Ninja.parent    , Person   , 'Ninja.parent should exist and be Person');
		strictEqual(FireNinja.parent, Ninja    , 'FireNinja.parent should exist and be Ninja');
	});
		
	test('Static inheritance checking', function() {
			
		strictEqual(typeof Class.inheritsFrom    , 'function', 'Class.inheritsFrom should exist and be a function');
		strictEqual(typeof Person.inheritsFrom   , 'function', 'Person.inheritsFrom should exist and be a function');
		strictEqual(typeof Ninja.inheritsFrom    , 'function', 'Ninja.inheritsFrom should exist and be a function');
		strictEqual(typeof FireNinja.inheritsFrom, 'function', 'FireNinja.inheritsFrom should exist and be a function');
		
		
		// Class vs Person vs Ninja vs FireNinja

		strictEqual(Class.inheritsFrom(FireNinja), false, 'Class.inheritsFrom(FireNinja) should return false');
		strictEqual(Class.inheritsFrom(Ninja)    , false, 'Class.inheritsFrom(Ninja) should return false');
		strictEqual(Class.inheritsFrom(Person)   , false, 'Class.inheritsFrom(Person) should return false');
		strictEqual(Class.inheritsFrom(Class)    , false, 'Class.inheritsFrom(Class) should return false');
		
		strictEqual(Person.inheritsFrom(FireNinja), false, 'Person.inheritsFrom(FireNinja) should return false');
		strictEqual(Person.inheritsFrom(Ninja)    , false, 'Person.inheritsFrom(Ninja) should return false');
		strictEqual(Person.inheritsFrom(Person)   , false, 'Person.inheritsFrom(Person) should return false');
		strictEqual(Person.inheritsFrom(Class)    , true , 'Person.inheritsFrom(Class) should return true');
		
		strictEqual(Ninja.inheritsFrom(FireNinja), false, 'Ninja.inheritsFrom(FireNinja) should return false');
		strictEqual(Ninja.inheritsFrom(Ninja)    , false, 'Ninja.inheritsFrom(Ninja) should return false');
		strictEqual(Ninja.inheritsFrom(Person)   , true , 'Ninja.inheritsFrom(Person) should return true');
		strictEqual(Ninja.inheritsFrom(Class)    , true , 'Ninja.inheritsFrom(Class) should return true');
		
		strictEqual(FireNinja.inheritsFrom(FireNinja), false, 'Ninja.inheritsFrom(FireNinja) should return true');
		strictEqual(FireNinja.inheritsFrom(Ninja)    , true , 'Ninja.inheritsFrom(Ninja) should return true');
		strictEqual(FireNinja.inheritsFrom(Person)   , true , 'Ninja.inheritsFrom(Person) should return true');
		strictEqual(FireNinja.inheritsFrom(Class)    , true , 'Ninja.inheritsFrom(Class) should return true');
		
		
		// Classes vs scalar objects
		
		strictEqual(Class.inheritsFrom(undefined)    , false, 'Class.inheritsFrom(undefined) should return false');
		strictEqual(Class.inheritsFrom(null)         , false, 'Class.inheritsFrom(null) should return false');
		strictEqual(Class.inheritsFrom(0)            , false, 'Class.inheritsFrom(0) should return false');
		strictEqual(Class.inheritsFrom(new Number(0)), false, 'Class.inheritsFrom(new Number(0)) should return false');
		strictEqual(Class.inheritsFrom(Class)        , false, 'Class.inheritsFrom(Class) should return false');
		
		strictEqual(Person.inheritsFrom(undefined)    , false, 'Person.inheritsFrom(undefined) should return false');
		strictEqual(Person.inheritsFrom(null)         , false, 'Person.inheritsFrom(null) should return false');
		strictEqual(Person.inheritsFrom(0)            , false, 'Person.inheritsFrom(0) should return false');
		strictEqual(Person.inheritsFrom(new Number(0)), false, 'Person.inheritsFrom(new Number(0)) should return false');
		
		strictEqual(Ninja.inheritsFrom(undefined)    , false, 'Ninja.inheritsFrom(undefined) should return false');
		strictEqual(Ninja.inheritsFrom(null)         , false, 'Ninja.inheritsFrom(null) should return false');
		strictEqual(Ninja.inheritsFrom(0)            , false, 'Ninja.inheritsFrom(0) should return false');
		strictEqual(Ninja.inheritsFrom(new Number(0)), false, 'Ninja.inheritsFrom(new Number(0)) should return false');
	});
	
	
	/* =========================================================================
	 * Static fields and methods
	 * =========================================================================
	 */
	
	var Worker = Person.extend('Worker', {
		skills: [],
		getSkills: function(personClass) {
			personClass = personClass || this;
			var skills = [];
			var parentSkills = personClass.parent.inheritsFrom(Worker) ? Worker.getSkills(personClass.parent) : [];
			for(var i = 0 ; i < parentSkills.length ; i++)
				skills.push(parentSkills[i]);
			for(var i = 0 ; i < personClass.skills.length ; i++)
				skills.push(personClass.skills[i]);
			return skills;
		},
		compare: function(person1, person2) {
			return person1.constructor.getSkills() - person2.constructor.getSkills();
		}
	}, {
		init : function(isDancing) {
			this.dancing = isDancing;
		},
		dance : function() {
			return this.dancing;
		}
	});
	
	var ProfessionalNinja = Worker.extend('ProfessionalNinja', {
		skills: ['swordsmanship']
	}, {
		init : function() {
			this._super(false);
		},
		swingSword : function() {
			return true;
		}
	});
	
	var ProfessionalFireNinja = ProfessionalNinja.extend('ProfessionalFireNinja', {
		skills: ['fire']
	}, {
		throwFireBall : function() {
			if('console' in window)
				console.log(this, ': fire!');
		}
	});
	
	var UnspecializedNinja = ProfessionalNinja.extend('UnspecializedNinja', {});
	
	test('Static fields', function() {
		ok('skills' in Worker               , 'Worker should have a static field "skills"');
		ok('skills' in ProfessionalNinja    , 'ProfessionalNinja should have a static field "skills"');
		ok('skills' in ProfessionalFireNinja, 'ProfessionalFireNinja should have a static field "skills"');
		ok(!('skills' in UnspecializedNinja), 'UnspecializedNinja should not have a static field "skills"');
		deepEqual(Worker.skills                , []               , 'Worker should have a static field "skills"');
		deepEqual(ProfessionalNinja.skills     , ['swordsmanship'], 'ProfessionalNinja should have a static field "skills"');
		deepEqual(ProfessionalFireNinja.skills , ['fire']         , 'ProfessionalFireNinja should have a static field "skills"');
	});
	
	test('Static methods', function() {
		strictEqual(typeof Worker.getSkills, 'function', 'Worker should have a static method "getSkills()"');
		strictEqual(typeof Worker.compare  , 'function', 'Worker should have a static method "compare()"');
		
		strictEqual(ProfessionalNinja.getSkills    , undefined, 'ProfessionalNinja should not have a static method "getSkills()"');
		strictEqual(ProfessionalNinja.compare      , undefined, 'ProfessionalNinja should not have a static method "compare()"');
		strictEqual(ProfessionalFireNinja.getSkills, undefined, 'ProfessionalFireNinja should not have a static method "getSkills()"');
		strictEqual(ProfessionalFireNinja.compare  , undefined, 'ProfessionalFireNinja should not have a static method "compare()"');
		
		deepEqual(Worker.getSkills()                     , []                       , 'Worker.getSkills() should return []');
		deepEqual(Worker.getSkills(Worker)               , []                       , 'Worker.getSkills(Worker) should return []');
		deepEqual(Worker.getSkills(ProfessionalNinja)    , ['swordsmanship']        , 'Worker.getSkills(ProfessionalNinja) should return ["swordsmanship"]');
		deepEqual(Worker.getSkills(ProfessionalFireNinja), ['swordsmanship', 'fire'], 'Worker.getSkills(ProfessionalFireNinja) should return ["swordsmanship","fire"]');
	});
	
	/* =========================================================================
	 * Mixins
	 * =========================================================================
	 */

	var Dancer = Class.extend('Dancer', {
		doSomething: function() { return 'I dance!'; }
	});
	var NinjaMixin = Class.extend('NinjaMixin', {
		doSomething: function() { return 'I kill you!'; }
	});
	var FireNinjaMixin = NinjaMixin.extend('NinjaMixin', {});
	
	var DancerNinja = Class.extend('DancerNinja', [NinjaMixin, Dancer], {});
	var NinjaDancer = Class.extend('NinjaDancer', [Dancer, NinjaMixin], {
		doSomething: function() { return this._super(); }
	});
	var DancerFireNinja = Class.extend('DancerFireNinja', [FireNinjaMixin, Dancer], {});
	var FireNinjaDancer = Class.extend('FireNinjaDancer', [Dancer, FireNinjaMixin], {
		doSomething: function() { return this._super(); }
	});
	
	test('Mixins priority', function() {
		strictEqual(typeof (new DancerNinja().doSomething), 'function', "new DancerNinja() should have a doSomething() method");
		strictEqual(typeof (new DancerFireNinja().doSomething), 'function', "new DancerFireNinja() should have a doSomething() method");
		strictEqual(new DancerNinja().doSomething(), 'I kill you!', 'A dancer Ninja should kill you');
		strictEqual(new DancerFireNinja().doSomething(), 'I kill you!', 'A dancer FireNinja should kill you');
	});
	
	test('Mixins inheritance', function() {
		strictEqual(typeof (new NinjaDancer().doSomething), 'function', "new NinjaDancer() should have a doSomething() method");
		strictEqual(typeof (new FireNinjaDancer().doSomething), 'function', "new FireNinjaDancer() should have a doSomething() method");
		strictEqual(new NinjaDancer().doSomething(), 'I dance!'   , 'A ninja Dancer should dance');
		strictEqual(new FireNinjaDancer().doSomething(), 'I dance!'   , 'A fire ninja Dancer should dance');
	});
	
	/* =========================================================================
	 * Class helpers
	 * =========================================================================
	 */
	
	test('Class.getParents()', function() {

		// No mixins
		deepEqual(Class.getParents()    , [], 'Class.getParents() should return []');
		deepEqual(Person.getParents()   , [Class], 'Person.getParents() should return [Class]');
		deepEqual(Ninja.getParents()    , [Class,Person], 'Ninja.getParents() should return [Class,Person]');
		deepEqual(FireNinja.getParents(), [Class,Person,Ninja], 'FireNinja.getParents() should return [Class,Person,Ninja]');
		
		// Mixins
		deepEqual(DancerNinja.getParents()    , [Class], 'DancerNinja.getParents() should return [Class]');
		deepEqual(NinjaDancer.getParents()    , [Class], 'NinjaDancer.getParents() should return [Class]');
		deepEqual(DancerFireNinja.getParents(), [Class], 'DancerFireNinja.getParents() should return [Class]');
		deepEqual(FireNinjaDancer.getParents(), [Class], 'FireNinjaDancer.getParents() should return [Class]');
	});
	
	window.Class = Class;
	window.Person = Person;
	window.Ninja = Ninja;
	window.FireNinja = FireNinja;
	
	window.Worker = Worker;
	window.ProfessionalNinja = ProfessionalNinja;
	window.ProfessionalFireNinja = ProfessionalFireNinja;
	
	window.Dancer = Dancer;
	window.NinjaMixin = NinjaMixin;
	window.FireNinjaMixin = FireNinjaMixin;
	window.DancerNinja = DancerNinja;
	window.NinjaDancer = NinjaDancer;
	window.DancerFireNinja = DancerFireNinja;
	window.FireNinjaDancer = FireNinjaDancer;
});