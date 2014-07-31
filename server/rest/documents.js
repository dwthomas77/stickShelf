// express + app + bookshelf
var express = require('express');
var app = require( process.cwd() + '/server/server');
var bookshelf = app.get('bookshelf');

// lodash for binding and stuff
var _ = require('lodash');

// Document model
var Document = require('./models/DocumentModel');

// declare the router
var router = express.Router();

// DOCUMENTS API (/rest/documents)
router.route('/')

	// Fetch All Documents (GET)
	.get(function(req, res) {
	
		// bind this response for error handling
		var returnError = returnErrorFunc(res);

		Document.collection().fetch({
				withRelated: ['user']
			})
			.then(function(collection) {
				res.json(collection.toJSON());
			});

	})

	// Add new Document (POST)
	.post(function(req, res) {
		
		// bind this response to error function
		var returnError = returnErrorFunc(res);

		// confirm body of request
		if(!req.body){
			returnError('Required parameters for new Document were not provided.');
		}else{
			// build model from payload
			var doc = new Document(req.body);
			// validate model
			var validationError = doc.validate();
			if(validationError) {
				returnError(validationError);
			}else{
				doc.save().then(function(model) {
					res.json(200, {
						"msg" : "Document Model ID " + model.get('id') +  " Successfully Added"
					})
				});
			}
		}

	});

// DOCUMENT API (/rest/documents/:id)
router.route('/:id')

	// Fetch by ID (GET)
	.get(function(req, res) {

		// bind this response to error function
		var returnError = returnErrorFunc(res);

		new Document({'id': req.params.id})
			.fetch({
				withRelated: ['user']
			})
			.then(function(doc) {
				// if document is not returned, then return error
				if(!doc){
					returnError('Document ID '+req.params.id+' was not found in the database.');
				}else{
					// GET Document by ID
					res.json(200, group.toJSON());
				}
			});
	})

	// Update by ID (PUT)
	.put(function(req, res) {

		// bind this response to error function
		var returnError = returnErrorFunc(res);

		new Document({'id': req.params.id})
			.fetch()
			.then(function(doc) {
				// if document is not returned, then return error
				if(!doc){
					returnError('Document ID '+req.params.id+' was not found in the database.');
				}else{
					doc.save(req.body)
					// then return success message to the UI
					.then(function(){
						res.json(200, {
							"msg" : 'Group '+req.params.id+' successfully updated in database.'
						})
					})
					.catch(function(error) {
						var errorMsg = new String(error);
						returnError(errorMsg);
					});
				}
			});
	})

	// DELETE by ID (DELETE)
	.delete(function(req, res) {

		// bind this response to error function
		var returnError = returnErrorFunc(res);

		new Document({'id': req.params.id})
			.fetch()
			.then(function(doc) {
				// if document is not returned, then return error
				if(!doc){
					returnError('Document ID '+req.params.id+' was not found in the database.');
				}else{
					doc.destroy()
					// then return success message to the UI
					.then(function(){
						res.json(200, {
							"msg" : 'Document '+req.params.id+' successfully removed from database.'
						})
					})
					.catch(function(error) {
						var errorMsg = new String(error);
						returnError(errorMsg);
					});
				}
			});

	});

module.exports = router;

// * -- global functions -- *

// function to handle returning error messages
function returnErrorFunc(res){
	return function(str){
		res.json(404, {
			"error" : {
				"msg" : str
			}
		});
	};
}

