
define(['./DeploymentPattern'], function(DeploymentPattern) {

	function VApp(id, name, status) {
		this.id = id;
		this.name = name;
		this.status = 4;
		this.deploymentPatterns = [];
	}
	
	VApp.prototype.toString = function() {
		return this.name;
	};
	
	VApp.prototype.isRunning = function() {
		return this.status == 4 || this.status == 10;
	};
	
	VApp.prototype.addDeploymentPattern = function(deploymentPattern) {
		if(this.deploymentPatterns.indexOf(deploymentPattern) !== -1) {
			throw new Error('The deployment pattern ' + deploymentPattern + ' already exists in vApp ' + this);
		}
		this.deploymentPatterns.push(deploymentPattern);
		return this;
	};
	
	VApp.prototype.removeDeploymentPattern = function(deploymentPattern) {
		if(this.deploymentPatterns.indexOf(deploymentPattern) === -1) {
			throw new Error('The deployment pattern ' + deploymentPattern + ' does not exist in vApp ' + this);
		}
		this.deploymentPatterns.splice(this.deploymentPatterns.indexOf(deploymentPattern), 1);
		return this;
	};
	
	return VApp;
});