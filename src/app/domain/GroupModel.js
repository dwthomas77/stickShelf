define([],
	function(){
		'use strict';

		return Backbone.Model.extend({

			validate: function(attrs, options) {
				if (!attrs.name || typeof attrs.name !== 'string') {
					return "Group Name missing or not valid string";
				}
			},

			urlRoot: '/rest/groups'

		});
	
});