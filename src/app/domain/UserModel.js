define([],
	function(){
		'use strict';

		return Backbone.Model.extend({

			validate: function(attrs, options) {
				var errors = [];
				if (!attrs.first_name || typeof attrs.first_name !== 'string') {
					errors.push(' First Name missing or not valid string');
				}
				if (!attrs.last_name || typeof attrs.last_name !== 'string') {
					errors.push(' Last Name missing or not valid string');
				}
				if(!/(.+)@(.+){2,}\.(.+){2,}/.test(attrs.email)){
					errors.push(' Email is not valid');
				}

				if(errors.length > 0){
					return errors.join();
				}
			},

			// list of attributes which should not be cleaned
			noCleanList: [
				'id',
				'first_name',
				'last_name',
				'email',
				'group_id'
			],

			// unset unwanted attributes and return self
			clean: function() {
	            _.each(this.attributes, function(value, key){
	                if(!_.contains(this.noCleanList, key) ){
	                    this.unset(key);
	                }
	            }, this);

	            return this;
			},

			urlRoot: '/rest/users'

		});
	
});