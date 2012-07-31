
var vAppController;
var vAppClone;

define(['angular', '../model/VApp', '../model/DeploymentPattern'], function(angular, VApp, DeploymentPattern) {
	
	vAppController = function vAppController($scope) {
		
		$scope.vAppClone = vAppClone = new VApp(123, 'My vApp');
		$scope.vAppClone.addDeploymentPattern(new DeploymentPattern(1, 'OBM test #1'));
		$scope.vAppClone.addDeploymentPattern(new DeploymentPattern(2, 'OBM test #2'));
		
		$scope.deploymentPattern = new DeploymentPattern(0, '');
		
		$scope.removeDeploymentPattern = function(deploymentPattern) {
			$scope.vAppClone.removeDeploymentPattern(deploymentPattern);
		};
		
		$scope.addDeploymentPattern = function() {
			$scope.vAppClone.addDeploymentPattern( $scope.deploymentPattern.clone() );
		};
		
		$scope.save = function() {
			vApp = vAppClone.clone();
		};
		
		/*
		$scope.addDeploymentPattern = function() {
			$scope.vApp.addDeploymentPattern();
		}
		
		
			
			
			
			$scope.todos = [
			                {text:'learn angular', done:true},
			                {text:'build an angular app', done:false}];
			             
			              $scope.addTodo = function() {
			                $scope.todos.push({text:$scope.todoText, done:false});
			                $scope.todoText = '';
			              };
			             
			              $scope.remaining = function() {
			                var count = 0;
			                angular.forEach($scope.todos, function(todo) {
			                  count += todo.done ? 0 : 1;
			                });
			                return count;
			              };
			             
			              $scope.archive = function() {
			                var oldTodos = $scope.todos;
			                $scope.todos = [];
			                angular.forEach(oldTodos, function(todo) {
			                  if (!todo.done) $scope.todos.push(todo);
			                });
			              };
		} */
	};
});