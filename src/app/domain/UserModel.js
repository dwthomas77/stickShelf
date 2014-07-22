define([],
	function(){
		'use strict';

		return Backbone.Model.extend({

			validate: function(attrs, options) {
				var errors = [];
				if (!attrs.first_name || typeof attrs.first_name !== 'string') {
					errors.push('First Name missing or not valid string');
				}
				if (!attrs.first_last || typeof attrs.first_last !== 'string') {
					errors.push('Last Name missing or not valid string');
				}
				if(!/(.+)@(.+){2,}\.(.+){2,}/.test(attrs.email)){
					errors.push('Email is not valid');
				}
			},

			urlRoot: '/rest/users'

		});
	
});