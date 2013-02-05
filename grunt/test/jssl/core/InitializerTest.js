define(['jssl/core/Initializer'], function(Initializer) {
	
	module('jssl/core/Initializer');
	
	var Person = Initializer.extend('Person', {
		init: function() {
			this.age = 0;
			this.mainEvents = {};
			this._super();
		},
		initEducation: function() {
			this.diplomas = [];
		},
		initMainEvents: function() {
			this.mainEvents.birth = new Date();
		}
	});
	
	var Sportsman = Person.extend('Sportsman', {
		initCareer: function() {
			this.titles = 0;
		}
	});
	
	var p = new Person();
	
	test('Initializers are run', function() {
		ok('age' in p, 'new Person() should have a field called age');
		strictEqual(p.age, 0, 'new Person().age should be 0');
		
		ok('diplomas' in p, 'new Person() should have a field called diplomas');
		deepEqual(p.diplomas, [], 'new Person().diplomas should be []');
		
		ok('birth' in p.mainEvents, 'new Person().mainEvents should have a field called diplomas');
		ok(p.mainEvents.birth instanceof Date, 'new Person().mainEvents.birth should be a Date');
	});
	
	test('Non-function are not run', function() {
		var Machine = Initializer.extend('Person', {
			init: function() {
				this.initMachineComputer = false;
				this._super();
			},
			initSystem: function() {
				this.systemOK = true;
			}
		});
		
		var m = new Machine();
		ok(m.systemOK, 'new Machine().systemOK shoudl equal true');
	});
	
	
	var s = new Sportsman();
	
	test('Parent initializers are run', function() {
		
		ok('age' in s, 'new Sportsman() should have a field called age');
		strictEqual(s.age, 0, 'new Sportsman().age should be 0');
		
		ok('diplomas' in s, 'new Sportsman() should have a field called diplomas');
		deepEqual(s.diplomas, [], 'new Sportsman().diplomas should be []');
		
		ok('birth' in s.mainEvents, 'new Sportsman().mainEvents should have a field called diplomas');
		ok(s.mainEvents.birth instanceof Date, 'new Sportsman().mainEvents.birth should be a Date');
		
		ok('titles' in s, 'new Sportsman() should have a field called titles');
		strictEqual(s.titles, 0, 'new Person().titles should be 0');
	});
	
	window.Initializer = Initializer;
	window.Person = Person;
});