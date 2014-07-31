define([],
	function(){
		'use strict';

		return Backbone.Model.extend({

			validate: function(attrs, options) {
				var errors = [];
				if (!attrs.title || typeof attrs.title !== 'string') {
					errors.push(' Title missing or not valid string');
				}
				if (!attrs.body || typeof attrs.body !== 'string') {
					errors.push(' Body missing or not valid string');
				}

				if(errors.length > 0){
					return errors.join();
				}
			},

			// list of attributes to be saved
			cleanList: [
				'id',
				'title',
				'body',
				'user_id'
			],

			// unset unwanted attributes and return self
			clean: function() {
	            _.each(this.attributes, function(value, key){
	                if(!_.contains(this.cleanList, key) ){
	                    this.unset(key);
	                }
	            }, this);

	            return this;
			},

			urlRoot: '/rest/documents'

		});
	
});