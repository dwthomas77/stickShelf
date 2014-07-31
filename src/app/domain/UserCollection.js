define(['app/domain/UserModel'],
	function(UserModel){
		'use strict';

		return Backbone.Collection.extend({

			model: UserModel,

			url: '/rest/users'

		});
	
});