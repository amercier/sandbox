
var MainController,
    NavigationController,
    CloudController;

define(['jquery', 'require',
        '../model/Organization', '../model/OrganizationNetwork', '../model/VApp', '../model/DeploymentPattern',
        'bootstrap', 'domReady!'],
function($, require, Organization, OrganizationNetwork, VApp, DeploymentPattern) {
	
	/**
	 * Main controller
	 */
	MainController = function($scope) {
		$scope.organizations = [];
	};
	
	/**
	 * Navigation controller
	 */
	NavigationController = function($scope) {
		$scope.items = ['cloud', 'organization', 'network'];
		$scope.selection = $scope.items[0];
		/*
		$scope.isCurrentView = function(view) {
			return $scope.currentView == view;
		};
		*/
		$scope.showMyCloudView = function() {
			$scope.selection = $scope.items[0];
			$('#mainTabs a[href="#cloud"]').tab('show');
		};
		$scope.showOrganizationView = function(organization) {
			$scope.selection = $scope.items[1];
			$('#mainTabs a[href="#organization"]').tab('show');
		};
		$scope.showNetworkView = function(network) {
			$scope.selection = $scope.items[2];
			$('#mainTabs a[href="#network"]').tab('show');
		};
	};
	
	/**
	 * Cloud Controller (add/remove organizations)
	 */
	CloudController = function($scope) {
		
		$scope.newOrganizationName = '';
		$scope.addOrganizationStatus = '';
		$scope.addOrganizationMessage = '';
		
		$scope.addOrganization = function() {
			try {
				$scope.organizations.push(new Organization($scope.newOrganizationName));
				$scope.newOrganizationName = '';
				$scope.addOrganizationStatus = '';
				$scope.addOrganizationMessage = '';
			}
			catch(e) {
				$scope.addOrganizationStatus = 'error';
				$scope.addOrganizationMessage = e.message;
			}
		};

		$scope.removeOrganization = function(organization) {
			$scope.organizations.splice($scope.organizations.indexOf(organization), 1);
		};
		
		// Add an organization after 3 seconds
		setTimeout(function() {
			$scope.organizations.push(new Organization('Random Org'));
			$scope.$apply();
		}, Math.random() * 2000 + 1000);
	};
	
	/*
	
	OrganizationController = function OrganizationController($scope) {

		$scope.newNetworkName = '';
		$scope.addNetworkStatus = '';
		$scope.addNetworkMessage = '';
		
		$scope.addNetwork = function() {
			try {
				$scope.organization.addNetwork(new OrganizationNetwork($scope.newNetworkName));
				$scope.newNetworkName = '';
			}
			catch(e) {
				$scope.addNetworkStatus = 'error';
				$scope.addNetworkMessage = e.message;
			}
		};
		
		$scope.removeNetwork = function(network) {
			$scope.organization.removeNetwork(network);
		};
	};
		
	/*
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
	
	// Load AngularJS
	require(['angular']);
});