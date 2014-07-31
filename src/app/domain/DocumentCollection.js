define(['app/domain/DocumentModel'],
	function(DocumentModel){
		'use strict';

		return Backbone.Collection.extend({

			model: DocumentModel,

			url: '/rest/documents'

		});
	
});