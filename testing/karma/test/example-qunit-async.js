var run = [0,0,0,0];

asyncTest( "First test (long running test)", function() {
  setTimeout(function() {
    deepEqual(run, [0,0,0,0], 'First test should run before all tests');
    run[0] = 1;
    QUnit.start();
  }, 2000);
});

asyncTest( "Second test (long running test)", function() {
  setTimeout(function() {
    deepEqual(run, [1,0,0,0], 'Second test shouldn\'t run before the first tests');
    run[1] = 1;
    QUnit.start();
  }, 1000);
});

test('Third test', function() {
  deepEqual(run, [1,1,0,0], 'Third test shouldn\'t run before the 2 first tests');
  run[2] = 1;
});

asyncTest('Fourth test', function() {
  deepEqual(run, [1,1,1,0], 'Second test shouldn\'t run before the 3 first test');
  run[3] = 1;
  QUnit.start();
});

