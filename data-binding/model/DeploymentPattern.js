
define([], function(VApp) {

	function DeploymentPattern(id, name) {
		this.id = id;
		this.name = name;
	}
	
	DeploymentPattern.prototype.toString = function() {
		return this.name;
	};
	
	DeploymentPattern.prototype.getName = function() {
		return this.name;
	};
	
	DeploymentPattern.prototype.clone = function() {
		return new DeploymentPattern(this.id, this.name);
	};
	
	return DeploymentPattern;
});