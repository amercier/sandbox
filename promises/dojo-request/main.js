define(['dojo/request', 'dojo/deferred', 'echo', 'domReady!'], function(request, Deferred, echo) {
	
	var idRegExp = /.*\/([^\/]+)$/;
	
	function vCloudGet(url, options, callback) {
		var deferred = new Deferred();
		var xhr = request(url, options)
			.then(
				function(result) {
					try {
						deferred.resolve(callback(result, xhr));
					}
					catch(error) {
						deferred.reject(error);
					}
				},
				function(xhr, textStatus, errorThrown) {
					var error = new Error('Ajax request to the vCloud API failed' + (textStatus ? ' (' + textStatus + ')' : '') + '.');
					error.textStatus = textStatus;
					error.errorThrown = errorThrown;
					deferred.reject(error);
				}
			);
		return deferred.promise;
	}
	
	/**
	 * Authenticate
	 */
	function getAuthenticationToken(session, password) {
		console.log('Retrieving authentication token...');
		echo('Retrieving authentication token...');
		return vCloudGet(session.url + '/login', {
			headers: {
				'Authorization': 'Basic ' + window.btoa(session.username + '@' + session.organization + ':' + password)
			}},
			function(result, xhr) {
				var token = xhr.getResponseHeader('x-vcloud-authorization');
				console.log('Retrieved authentication token: ' + token);
				echo('Retrieved authentication token: ' + token);
				return $.extend(session, {token: token});
			}
		);
	}
	
	/**
	 * Get the current organization id
	 * @return {Promise}
	 */
	function getCurrentOrganizationId(session) {
		console.log('Retrieving current organization id...');
		echo('Retrieving current organization id...');
		return vCloudGet(session.url + '/org', {
			headers: {
				'x-vcloud-authorization': session.token
			}},
			function (result) {
				var organizationId = $(result).find('Org').attr('href').replace(idRegExp, '$1');
				console.log('Retrieved current organization id: ' + organizationId);
				echo('Retrieved current organization id: ' + organizationId);
				return $.extend(session, {organizationId:organizationId});
			});
	}
	
	/**
	 * Get a user id
	 * @return {Promise}
	 */
	function getUserId(session) {
		console.log('Retrieving user id...');
		echo('Retrieving user id...');
		return vCloudGet(session.url + '/admin/org/' + session.organizationId, {
			headers: {
				'x-vcloud-authorization': session.token
			}},
			function (result) {
				var userId = $(result).find('UserReference[name="' + session.username + '"]').attr('href').replace(idRegExp, '$1');
				console.log('Retrieved user id: ' + userId);
				echo('Retrieved user id: ' + userId);
				return $.extend(session, {userId:userId});
			});
	}
	
	/**
	 * Get a user id
	 * @return {Promise}
	 */
	function getUserRoleId(session) {
		console.log('Retrieving role id...');
		echo('Retrieving role id...');
		return vCloudGet(session.url + '/admin/user/' + session.userId, {
			headers: {
				'x-vcloud-authorization': session.token
			}},
			function (result) {
				var roleId = $(result).find('Role').attr('href').replace(idRegExp, '$1');
				console.log('Retrieved role id: ' + roleId);
				echo('Retrieved role id: ' + roleId);
				return $.extend(session, {roleId:roleId});
			});
	}
	
	/**
	 * Get a user id
	 * @return {Promise}
	 */
	function isRoleAdmin(session) {
		console.log('Retrieving role rights...');
		echo('Retrieving role rights...');
		return vCloudGet(session.url + '/admin/role/' + session.roleId, {
			headers: {
				'x-vcloud-authorization': session.token
			}},
			function (result) {
				var isAdmin = $(result).find('RightReference[href$="/384"]').length == 1;
				console.log('Retrieved role rights: ' + isAdmin);
				echo('Retrieved role rights: ' + isAdmin);
				return $.extend(session, {isAdmin: isAdmin});
			});
	}
	
	
	
	/**
	 * UI
	 */
	$('#vcloud-admin-form').submit(function(event) {
		event.preventDefault();
		$('#console').empty();
		getAuthenticationToken({
					url         : $('#vcloud-url').val(),
					organization: $('#vcloud-organization').val(),
					username    : $('#vcloud-username').val()
				}, 
				$('#vcloud-password').val()
			)
			.then(getCurrentOrganizationId)
			.then(getUserId)
			.then(getUserRoleId)
			.then(isRoleAdmin)
			.then(function(session) {
				console.log('isAdmin ? ' + session.isAdmin);
				echo('isAdmin ? ' + session.isAdmin);
				console.log('Session object', session);
			}, function(error) {
				echo(error);
				console.error('' + error);
				throw error;
			});
	});
});