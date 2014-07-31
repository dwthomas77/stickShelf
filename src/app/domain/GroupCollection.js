define(['app/domain/GroupModel'],
	function(GroupModel){
		'use strict';

		return Backbone.Collection.extend({

			model: GroupModel,

			url: '/rest/groups'

		});
	
});