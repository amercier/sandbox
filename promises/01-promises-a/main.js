
define(['jquery', 'q', 'domReady!'], function($, Q) {
	
	var idRegExp = /.*\/([^\/]+)$/;
	
	var username, vcloudUrl, vcloudToken;
	
	function vCloudGet(url, callback) {
		var deferred = Q.defer();
		$.ajax(vcloudUrl + url, {
			headers: {'x-vcloud-authorization': vcloudToken}
		})
		.done(function (result) {
			try {
				deferred.resolve(callback(result));
			}
			catch(error) {
				deferred.reject(error);
			}
		})
		.fail(function (xhr, textStatus, errorThrown) {
			var error = new Error("Ajax request to the vCloud API failed.");
			error.textStatus = textStatus;
			error.errorThrown = errorThrown;
			deferred.reject(error);
		});
		return deferred.promise;
	}
	
	/**
	 * Get the current organization id
	 * @return {Promise}
	 */
	function getCurrentOrganizationId() {
		return vCloudGet('/org', function (result) {
			//throw new Error('test error 1');
			return $(result).find('Org').attr('href').replace(idRegExp, '$1');
		});
	}
	
	/**
	 * Get a user id
	 * @return {Promise}
	 */
	function getUserId(organizationId) {
		return vCloudGet('/admin/org/' + organizationId, function (result) {
			//throw new Error('test error 2');
			return $(result).find('UserReference[name="' + username + '"]').attr('href').replace(idRegExp, '$1');
		});
	}
	
	/**
	 * Get a user id
	 * @return {Promise}
	 */
	function getUserRoleId(userId) {
		return vCloudGet('/admin/user/' + userId, function (result) {
			//throw new Error('test error 3');
			return $(result).find('Role').attr('href').replace(idRegExp, '$1');
		});
	}
	
	/**
	 * Get a user id
	 * @return {Promise}
	 */
	function isRoleAdmin(roleId) {
		return vCloudGet('/admin/role/' + roleId, function (result) {
			//throw new Error('test error 4');
			return $(result).find('RightReference[href$="/384"]').length == 1;
		});
	}
	
	$('#vcloud-admin-form').submit(function(event) {
		event.preventDefault();
		
		username    = $('#vcloud-username').val();
		vcloudUrl   = $('#vcloud-url').val();
		vcloudToken = $('#vcloud-token').val();
		
		getCurrentOrganizationId()
			.then(getUserId)
			.then(getUserRoleId)
			.then(isRoleAdmin)
			.then(function(isAdmin) {
				console.log('isAdmin', isAdmin);
			}, function(error) {
				console.warn('Caught error', error);
			})
			.end();
	});
});