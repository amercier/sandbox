
define([], function() {

	var OrganizationNetwork = function(name) {
		if(!name) {
			throw new Error('Name can\'t be empty');
		}
		this.name = name;
	};
	
	OrganizationNetwork.prototype = {
		
		constructor: OrganizationNetwork,
		
		toString: function() {
			return this.name;
		}
	};
	
	return OrganizationNetwork;
});