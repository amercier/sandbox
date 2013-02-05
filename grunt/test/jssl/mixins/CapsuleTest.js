

define(['jssl/core/ClassDebug', 'jssl/core/Initializer', 'jssl/mixins/Capsule'],
		function(Class, Initializer, Capsule) {
	
	module('jssl/mixins/Capsule');
	
	test('Instanciation', function() {
		{
			var Task = Capsule('status').extend('Task', {});
			var task = new Task();
			ok('initStatus' in task, 'new Task() should have a method "initStatus"');
			ok('getStatus' in task , 'new Task() should have a method "getStatus"');
			ok('setStatus' in task , 'new Task() should have a method "setStatus"');
			strictEqual(typeof task.initStatus, 'function', 'new Task().initStatus should be a function');
			strictEqual(typeof task.getStatus , 'function', 'new Task().getStatus should be a function');
			strictEqual(typeof task.setStatus , 'function', 'new Task().setStatus should be a function');
		}
		{
			var Task = Initializer.extend('Task', [Capsule('status')], {});
			var task = new Task();
			ok('initStatus' in task, 'new Task() should have a method "initStatus"');
			ok('getStatus' in task , 'new Task() should have a method "getStatus"');
			ok('setStatus' in task , 'new Task() should have a method "setStatus"');
			strictEqual(typeof task.initStatus, 'function', 'new Task().initStatus should be a function');
			strictEqual(typeof task.getStatus , 'function', 'new Task().getStatus should be a function');
			strictEqual(typeof task.setStatus , 'function', 'new Task().setStatus should be a function');
		}
	});
	
	test('initXXX', function() {
		var Task = Capsule('status').extend('Task', {});
		var task = new Task();
		ok('status' in task, 'new Task() should have a field "status"');
		strictEqual(task.status, undefined, 'new Task().status should equal undefined');
	});
	
	test('getXXX', function() {
		var Task = Capsule('status').extend('Task', {});
		var task = new Task();
		strictEqual(task.getStatus(), undefined, 'new Task().getStatus() should equal undefined');
		task.status = "loading";
		strictEqual(task.getStatus(), "loading", 'task.getStatus() should equal "loading"');
	});
	
	test('setXXX', function() {
		var Task = Capsule('status').extend('Task', {});
		var task = new Task();
		strictEqual(task.getStatus(), undefined, 'new Task().status should equal undefined');
		task.setStatus("loading");
		strictEqual(task.getStatus(), "loading", 'task.getStatus() should equal "loading"');
		strictEqual(task.setStatus("done"), task, 'task.setStatus() should return task');
		strictEqual(task.getStatus(), "done", 'task.getStatus() should equal "done"');
	});
	
	
	test('Options: default value', function() {
		
		var validValues = [undefined, null, 'ok'];

		// Capsule as a parent
		for(var i = 0 ; i < validValues.length ; i++) {
			var Task = Capsule('status', {defaultValue:validValues[i]}).extend('Task', {});
			var task = new Task();
			strictEqual(task.status, validValues[i], '[parent] new Task().status should have default value ' + validValues[i]);
		}
		
		// Initializer as a parent and Capsule as a mixin
		for(var i = 0 ; i < validValues.length ; i++) {
			var Task = Initializer.extend('Task', [Capsule('status', {defaultValue:validValues[i]})], {});
			var task = new Task();
			strictEqual(task.status, validValues[i], '[mixin] new Task().status should have default value ' + validValues[i]);
		}
	});
	
	test('Options: method names', function() {
		{
			var Task = Capsule('status', {
				methodNames: {
					'get' : 'getState',
					'set' : 'setState',
					'init': 'initState'
				}
			}).extend('Task', {});
			var task = new Task();
			ok(!('initStatus' in task), 'new Task() should not have a method "initStatus"');
			ok(!('getStatus'  in task), 'new Task() should not have a method "getStatus"');
			ok(!('setStatus'  in task), 'new Task() should not have a method "setStatus"');
			ok('initState' in task, 'new Task() should  have a method "initState"');
			ok('getState'  in task, 'new Task() should have a method "getState"');
			ok('setState'  in task, 'new Task() should have a method "setState"');
			strictEqual(typeof task.initState, 'function', 'new Task().initState should be a function');
			strictEqual(typeof task.getState , 'function', 'new Task().getState should be a function');
			strictEqual(typeof task.setState , 'function', 'new Task().setState should be a function');
		}
		{
			var Task = Capsule('status', {
				methodNames: {
					'get' : 'getState'
				}
			}).extend('Task', {});
			var task = new Task();
			ok(!('getStatus'  in task), 'new Task() should not have a method "getStatus"');
			ok('getState'  in task, 'new Task() should have a method "getState"');
			strictEqual(typeof task.getState , 'function', 'new Task().getState should be a function');
		}
		{
			var Task = Capsule('status', {
				methodNames: {
					'set' : 'setState'
				}
			}).extend('Task', {});
			var task = new Task();
			ok(!('setStatus'  in task), 'new Task() should not have a method "setStatus"');
			ok('setState'  in task, 'new Task() should have a method "setState"');
			strictEqual(typeof task.setState , 'function', 'new Task().setState should be a function');
		}
		{
			var Task = Capsule('status', {
				methodNames: {
					'init': 'initState'
				}
			}).extend('Task', {});
			var task = new Task();
			ok(!('initStatus' in task), 'new Task() should not have a method "initStatus"');
			ok('initState' in task, 'new Task() should  have a method "initState"');
			strictEqual(typeof task.initState, 'function', 'new Task().initState should be a function');
		}
	});
	
	test('Options: validators', function() {
		
		// Validators return a boolean
		{
			var Task = Initializer.extend('Task', [Capsule('status', {
				validators: [
						function(value) { return value === undefined || value >= 1; },
						function(value) { return value === undefined || value >= 2; }
					]
			})], {});
			raises(function() { new Task().setStatus(0); }, Capsule.InvalidValueError, "new Task().setStatus(0) shouldn't pass the first validator");
			raises(function() { new Task().setStatus(1); }, Capsule.InvalidValueError, "new Task().setStatus(1) shouldn't pass the second validator");
			ok(new Task().setStatus(2) && true, "new Task().setStatus(2) should pass all the filters");
		}
		
		// Validators throw exception
		{
			function TaskError1() {}; 
			function TaskError2() {};
			var Task = Initializer.extend('Task', [Capsule('status', {
				validators: [
						function(value) { if(value !== undefined && value < 1) throw new TaskError1(); return true; },
						function(value) { if(value !== undefined && value < 2) throw new TaskError2(); return true; }
					]
			})], {});
			raises(function() { new Task().setStatus(0); }, TaskError1, "new Task().setStatus(0) shouldn't pass the first validator");
			raises(function() { new Task().setStatus(1); }, TaskError2, "new Task().setStatus(1) shouldn't pass the second validator");
			ok(new Task().setStatus(2) && true, "new Task().setStatus(2) should pass all the filters");
		}
	});
});