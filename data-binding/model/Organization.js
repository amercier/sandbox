
define(['./OrganizationNetwork'], function(OrganizationNetwork) {

	var Organization = function(name) {
		if(!name) {
			throw new Error('Name can\'t be empty');
		}
		this.name = name;
		this.vApps = [];
		this.vAppTemplates = [];
		this.networks = [];
	};
	
	Organization.prototype = {
		
		constructor: Organization,
		
		toString: function() {
			return this.name;
		},
		
		addNetwork: function(network) {
			if(!(network instanceof OrganizationNetwork)) {
				throw new TypeError('Expecting parameter to be an OrganizationNetwork object, ' + (network && network.constructor || $.type(network)) + ' given');
			}
			if(this.networks.indexOf(network) !== -1) {
				throw new Error('The network ' + network + ' already exists in Organization ' + this);
			}
			this.networks.push(network);
			return this;
		},
		
		removeNetwork: function(network) {
			if(!(network instanceof OrganizationNetwork)) {
				throw new TypeError('Expecting parameter to be an OrganizationNetwork object, ' + (network && network.constructor || $.type(network)) + ' given');
			}
			if(this.networks.indexOf(network) === -1) {
				throw new Error('The network ' + network + ' does not exist in Organization ' + this);
			}
			this.networks.splice(this.networks.indexOf(network), 1);
			return this;
		}
	};
	
	return Organization;
});